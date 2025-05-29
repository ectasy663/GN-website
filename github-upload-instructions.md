# GitHub Upload Instructions

To upload your website to GitHub:

## Option 1: Using GitHub Desktop (Easiest)
1. Download and install GitHub Desktop from https://desktop.github.com/
2. Sign in to your GitHub account
3. Add your local repository (File > Add Local Repository...)
4. Navigate to C:\Users\Lenovo\sample-website
5. Publish the repository to GitHub
6. Select your account and the repository name "website"
7. Click "Publish Repository"

## Option 2: Using Git with Personal Access Token
1. Go to GitHub: https://github.com/settings/tokens
2. Generate a new personal access token with 'repo' scope
3. Copy the token
4. Open a new PowerShell window and run:

```
cd C:\Users\Lenovo\sample-website
git remote set-url origin https://shaurya05745:YOUR_TOKEN@github.com/shaurya05745/website.git
git push -u origin master
```
(Replace YOUR_TOKEN with the token you copied)

## Option 3: Visual Studio Code
1. Open VS Code
2. Install the GitHub Pull Requests and Issues extension
3. Open your project folder
4. Go to Source Control tab
5. Sign in to GitHub
6. Publish the repository

Choose the method that works best for you!
