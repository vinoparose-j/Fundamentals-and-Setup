# Git & GitHub Version Control Workflow

## 1. Initial Setup (First-Time Workstation Configuration)

If Git is not yet installed on Windows, download **Git for Windows** (`https://git-scm.com/download/win`) or install via Winget:

```powershell
winget install --id Git.Git -e --source winget
```

Configure your global identity and line-ending handling:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
git config --global core.autocrlf input
```

Verify SSH or HTTPS authentication with GitHub:

```bash
ssh -T git@github.com
# or authenticate via GitHub CLI: gh auth login
```

## 2. Publishing This Project to GitHub

```bash
cd Internship-Phase1-Java-FullStack
git init
git add .
git commit -m "chore: initialize Phase 1 Java Full-Stack Fundamentals & Setup project"
git branch -M main
git remote add origin https://github.com/<your-username>/internship-phase1-java-fullstack.git
git push -u origin main
```

## 3. Branching Strategy

| Branch Pattern | Purpose |
| :--- | :--- |
| `main` | Stable, verified baseline; protected against direct force-pushes |
| `feat/<short-topic>` | New feature or milestone work (e.g., `feat/hello-world-api`) |
| `fix/<short-topic>` | Bug fixes (e.g., `fix/cors-headers`) |
| `docs/<short-topic>` | Documentation and onboarding reports |

## 4. Conventional Commits Standard

Format every commit message as `<type>(<scope>): <short summary>`:

- `feat:` New feature (e.g., `feat(api): add /api/onboarding milestones endpoint`)
- `fix:` Bug fix (e.g., `fix(frontend): handle offline backend preview gracefully`)
- `docs:` Documentation update (e.g., `docs: add team communication protocols`)
- `test:` Adding or updating tests (e.g., `test(backend): add MockMvc assertions for /api/hello`)
- `chore:` Tooling, dependencies, `.gitignore`, CI setup

## 5. Pull Request Checklist

1. Rebase or merge latest `main` into your feature branch.
2. Run backend tests (`mvn test`) and frontend tests + build (`npm test && npm run build`).
3. Confirm no `target/`, `node_modules/`, or `.env` files are staged.
4. Open a PR using `.github/PULL_REQUEST_TEMPLATE.md` and request peer/mentor review.
