# PowerShell script to fix the Education menu links in all Industry HTML files

# Get all HTML files in the Industries directory
$industryFiles = Get-ChildItem -Path ".\Industries" -Filter *.html

foreach ($file in $industryFiles) {
  Write-Host "Processing: $($file.FullName)"
    
  # Read the content of the file
  $content = Get-Content -Path $file.FullName -Raw
    
  # Replace Education menu links with correct paths
  $content = $content -replace '<li><a href="#"><div class="dropdown-item-content"><img src="../assets/workshops.png" alt="Workshops Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Workshops</span>', '<li><a href="../Education/workshops.html"><div class="dropdown-item-content"><img src="../assets/workshops.png" alt="Workshops Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Workshops</span>'
    
  $content = $content -replace '<li><a href="#"><div class="dropdown-item-content"><img src="../assets/indi training.png" alt="Individual Trainings Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Individual Trainings</span>', '<li><a href="../Education/individual-trainings.html"><div class="dropdown-item-content"><img src="../assets/indi training.png" alt="Individual Trainings Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Individual Trainings</span>'
    
  $content = $content -replace '<li><a href="#"><div class="dropdown-item-content"><img src="../assets/corpo training.png" alt="Corporate Trainings Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Corporate Trainings</span>', '<li><a href="../Education/corporate-trainings.html"><div class="dropdown-item-content"><img src="../assets/corpo training.png" alt="Corporate Trainings Icon" class="dropdown-icon" /><div class="text-content"><span class="item-title">Corporate Trainings</span>'
    
  # Save the modified content back to the file
  $content | Set-Content -Path $file.FullName
  Write-Host "Fixed Education links in: $($file.FullName)"
}

Write-Host "`nAll Industry pages have been updated with correct Education links."
