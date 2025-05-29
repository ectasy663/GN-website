@echo off
echo Pushing code to GitHub...

git add .
git commit -m "Full website upload"
git push -u origin master

if %errorlevel% neq 0 (
    echo Failed to push to GitHub. You may need to enter credentials.
    echo Please go to https://github.com/settings/tokens and create a Personal Access Token.
    echo For password, use the token instead of your GitHub password.
    set /p token="Enter your GitHub Personal Access Token: "
    git remote set-url origin https://shaurya05745:%token%@github.com/shaurya05745/website.git
    git push -u origin master
)

echo Process completed.
pause
