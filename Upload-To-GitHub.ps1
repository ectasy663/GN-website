function Push-To-GitHub {
    param (
        [Parameter(Mandatory=$true)]
        [string]$GitHubRepo,
        
        [Parameter(Mandatory=$true)]
        [string]$Username,
        
        [Parameter(Mandatory=$false)]
        [string]$Token
    )

    # Check if Git is installed
    try {
        $gitVersion = git --version
        Write-Host "Git is available: $gitVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "Git is not installed or not in PATH. Please install Git first." -ForegroundColor Red
        return
    }

    # Check if repository exists
    if (-not (Test-Path -Path ".git")) {
        Write-Host "Initializing git repository..." -ForegroundColor Yellow
        git init
    }
    else {
        Write-Host "Git repository already initialized." -ForegroundColor Green
    }

    # Configure remote
    $remoteUrl = "https://$Username@github.com/$GitHubRepo"
    if ($Token) {
        $remoteUrl = "https://$Username:$Token@github.com/$GitHubRepo"
    }

    # Check if origin exists
    $remotes = git remote
    if ($remotes -contains "origin") {
        Write-Host "Updating remote URL..." -ForegroundColor Yellow
        git remote set-url origin $remoteUrl
    }
    else {
        Write-Host "Adding remote..." -ForegroundColor Yellow
        git remote add origin $remoteUrl
    }

    # Add all files
    Write-Host "Adding all files..." -ForegroundColor Yellow
    git add .

    # Commit changes
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Upload entire website"

    # Get current branch name
    $branch = git rev-parse --abbrev-ref HEAD
    Write-Host "Current branch: $branch" -ForegroundColor Green

    # Push to GitHub
    try {
        Write-Host "Pushing to GitHub... This might take a while depending on your file size and internet connection." -ForegroundColor Yellow
        if ($Token) {
            git push -u origin $branch
        }
        else {
            # Push and capture output to avoid showing credentials in the terminal
            $output = git push -u origin $branch 2>&1
            if ($LASTEXITCODE -ne 0) {
                Write-Host "Push failed. You might need to provide a token." -ForegroundColor Red
                Write-Host "Visit https://github.com/settings/tokens to create a token with 'repo' scope."
                $Token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
                $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($Token)
                $plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
                
                $tokenUrl = "https://$Username:$plainToken@github.com/$GitHubRepo"
                git remote set-url origin $tokenUrl
                git push -u origin $branch
            }
        }
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
            Write-Host "Visit https://github.com/$GitHubRepo to see your repository."
        }
    }
    catch {
        Write-Host "Error pushing to GitHub: $_" -ForegroundColor Red
    }
}

# Run the function
Write-Host "GitHub Website Uploader" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
$repo = Read-Host "GitHub Repository (e.g., shaurya05745/website)"
$username = Read-Host "GitHub Username"

Push-To-GitHub -GitHubRepo $repo -Username $username
