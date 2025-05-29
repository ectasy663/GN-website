# Manual GitHub Upload Instructions

## Prerequisites
1. Make sure Git is installed on your computer
2. Have a GitHub account (username: shaurya05745)
3. Create a personal access token on GitHub:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "Website Upload"
   - Check the "repo" scope box
   - Click "Generate token"
   - Copy the token immediately (you won't be able to see it again)

## Option 1: Run the batch file
1. Open the file explorer and navigate to C:\Users\Lenovo\sample-website
2. Double-click on "upload-website-to-github.bat"
3. Follow the prompts in the terminal
4. When asked for your password, enter the personal access token you created

## Option 2: Manual Git commands
If the batch file doesn't work, open a new PowerShell window and run these commands:

```powershell
# Navigate to your website folder
cd C:\Users\Lenovo\sample-website

# Initialize Git if not already initialized
git init

# Add all files
git add .

# Commit the files
git commit -m "Upload entire website"

# Set the remote repository URL
git remote set-url origin https://github.com/shaurya05745/website.git
# If you get "remote origin not found" error, use this command instead:
# git remote add origin https://github.com/shaurya05745/website.git

# Push to GitHub (you'll be prompted for credentials)
git push -u origin master
# When prompted for password, use your personal access token, not your GitHub password
```

## Option 3: GitHub Desktop (Easiest)
1. Download and install GitHub Desktop from https://desktop.github.com/
2. Sign in to your GitHub account
3. Add your local repository (File > Add Local Repository...)
4. Navigate to C:\Users\Lenovo\sample-website
5. Click "Publish repository"
6. Enter "website" as the name
7. Click "Publish Repository"

## After uploading
1. Visit https://github.com/shaurya05745/website to confirm your files were uploaded
2. You can enable GitHub Pages in the repository settings to publish your website
