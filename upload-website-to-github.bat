@echo off
echo GitHub Website Uploader
echo =======================

REM Check if Git is available
git --version
if %errorlevel% neq 0 (
    echo Git is not installed or not in PATH. Please install Git first.
    pause
    exit /b
)

REM Set GitHub details
set GITHUB_REPO=shaurya05745/website

REM Make sure Git is initialized
if not exist .git (
    echo Initializing git repository...
    git init
) else (
    echo Git repository already initialized.
)

REM Add all files
echo Adding all files...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Upload entire website"

REM Configure remote
echo Setting up remote repository URL...
git remote set-url origin https://github.com/%GITHUB_REPO%.git
if %errorlevel% neq 0 (
    git remote add origin https://github.com/%GITHUB_REPO%.git
)

REM Push to GitHub
echo Pushing to GitHub... This may prompt for your GitHub credentials.
echo For password, use a Personal Access Token (not your GitHub password).
echo Visit https://github.com/settings/tokens to create a token with 'repo' scope.
git push -u origin master

pause
