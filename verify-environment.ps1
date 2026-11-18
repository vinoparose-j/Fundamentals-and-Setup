<#
.SYNOPSIS
    Verifies required development tools for the Java Full-Stack Internship (Phase 1).
#>

Write-Host "=== Java Full-Stack Environment Verification ===" -ForegroundColor Cyan

if (-not $env:JAVA_HOME) {
    $jdkDir = Get-ChildItem "C:\Program Files\Java" -Directory -Filter "jdk*" -ErrorAction SilentlyContinue |
        Sort-Object Name -Descending |
        Select-Object -First 1
    if ($jdkDir) {
        $env:JAVA_HOME = $jdkDir.FullName
    }
}

function Get-FirstLineOutput {
    param(
        [string]$ExePath,
        [string]$Arguments
    )
    $raw = cmd /c "`"$ExePath`" $Arguments 2>&1"
    $line = $raw | Where-Object { $_ -and ($_ -notmatch "^Access is denied") } | Select-Object -First 1
    return "$line".Trim()
}

$javaExe = if ($env:JAVA_HOME -and (Test-Path "$env:JAVA_HOME\bin\java.exe")) { "$env:JAVA_HOME\bin\java.exe" } else { "java.exe" }
$javacExe = if ($env:JAVA_HOME -and (Test-Path "$env:JAVA_HOME\bin\javac.exe")) { "$env:JAVA_HOME\bin\javac.exe" } else { "javac.exe" }

$checks = @(
    @{ Name = "Java JDK"; Command = $javaExe; Args = "-version" },
    @{ Name = "Java Compiler"; Command = $javacExe; Args = "-version" },
    @{ Name = "Node.js"; Command = "node.exe"; Args = "--version" },
    @{ Name = "npm"; Command = "npm.cmd"; Args = "--version" },
    @{ Name = "VS Code"; Command = "code.cmd"; Args = "--version" },
    @{ Name = "Git"; Command = "git.exe"; Args = "--version" }
)

foreach ($check in $checks) {
    $found = Get-Command $check.Command -ErrorAction SilentlyContinue
    if ($found) {
        $output = Get-FirstLineOutput -ExePath $found.Source -Arguments $check.Args
        Write-Host ("[OK]   {0,-15} -> {1}" -f $check.Name, $output) -ForegroundColor Green
    } else {
        Write-Host ("[MISS] {0,-15} -> Not found on PATH" -f $check.Name) -ForegroundColor Yellow
    }
}

$mvnCmd = Get-Command "mvn.cmd" -ErrorAction SilentlyContinue
if ($mvnCmd) {
    $mvnOutput = Get-FirstLineOutput -ExePath $mvnCmd.Source -Arguments "--version"
    Write-Host ("[OK]   {0,-15} -> {1}" -f "Apache Maven", $mvnOutput) -ForegroundColor Green
} elseif (Test-Path "C:\Program Files\netbeans\java\maven\bin\mvn.cmd") {
    $mvnOutput = Get-FirstLineOutput -ExePath "C:\Program Files\netbeans\java\maven\bin\mvn.cmd" -Arguments "--version"
    Write-Host ("[OK]   {0,-15} -> {1} (NetBeans bundled)" -f "Apache Maven", $mvnOutput) -ForegroundColor Green
} else {
    Write-Host ("[MISS] {0,-15} -> Not found on PATH" -f "Apache Maven") -ForegroundColor Yellow
}
