<#
.SYNOPSIS
    Launches the Spring Boot backend (port 8080) and Vite React frontend (port 5173).
#>

$root = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $root "backend"
$frontendDir = Join-Path $root "frontend"

if (-not $env:JAVA_HOME) {
    $jdkDir = Get-ChildItem "C:\Program Files\Java" -Directory -Filter "jdk*" -ErrorAction SilentlyContinue |
        Sort-Object Name -Descending |
        Select-Object -First 1
    if ($jdkDir) {
        $env:JAVA_HOME = $jdkDir.FullName
    }
}

$mvnExe = if (Get-Command "mvn.cmd" -ErrorAction SilentlyContinue) {
    "mvn.cmd"
} elseif (Test-Path "C:\Program Files\netbeans\java\maven\bin\mvn.cmd") {
    "C:\Program Files\netbeans\java\maven\bin\mvn.cmd"
} else {
    throw "Apache Maven (mvn.cmd) not found. Install Maven or add it to PATH."
}

Write-Host "Starting Spring Boot backend on http://localhost:8080 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:JAVA_HOME='$env:JAVA_HOME'; cd '$backendDir'; & '$mvnExe' spring-boot:run"

Write-Host "Starting React + Vite frontend on http://localhost:5173 ..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npm.cmd run dev"
