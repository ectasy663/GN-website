# PowerShell script to update all HTML files with new CSS and JavaScript references

# Get all HTML files in the workspace and subdirectories
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
  Write-Host "Processing: $($file.FullName)"
    
  # Read the content of the file
  $content = Get-Content -Path $file.FullName -Raw
  $modified = $false
    
  # Add animations.css if not already included
  if (-not $content.Contains('animations.css')) {
    $content = $content -replace '(<link rel="stylesheet" href=".*hero-animation.css" />)', '$1
  <link rel="stylesheet" href="css/animations.css" />'
        
    # Fix paths for subdirectories
    if ($file.DirectoryName -ne (Get-Location).Path) {
      $content = $content -replace 'href="css/animations.css"', 'href="../css/animations.css"'
    }
        
    $modified = $true
  }
    
  # Add new script references if not already included
  $newScripts = @(
    "data-node-interactions.js",
    "page-specific.js",
    "dynamic-content.js",
    "form-handler.js"
  )
    
  foreach ($script in $newScripts) {
    if (-not $content.Contains($script)) {
      $content = $content -replace '(</body>)', "  <script src=`"js/$script`" defer></script>`n$1"
            
      # Fix paths for subdirectories
      if ($file.DirectoryName -ne (Get-Location).Path) {
        $content = $content -replace "src=`"js/$script`"", "src=`"../js/$script`""
      }
            
      $modified = $true
    }
  }
    
  # Save the modified content back to the file
  if ($modified) {
    $content | Set-Content -Path $file.FullName
    Write-Host "Updated: $($file.FullName)"
  }
  else {
    Write-Host "No changes needed for: $($file.FullName)"
  }
}

Write-Host "`nScript update complete. All HTML files have been updated with the new CSS and JavaScript references."