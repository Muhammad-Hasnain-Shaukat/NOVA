$targetFolder = "$env:LOCALAPPDATA\Programs\Git"
if (!(Test-Path $targetFolder)) {
    New-Item -ItemType Directory -Force -Path $targetFolder | Out-Null
}

$zip = "$env:TEMP\mingit.zip"
Write-Host "Downloading MinGit portable..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip" -OutFile $zip

Write-Host "Extracting..."
Expand-Archive -Path $zip -DestinationPath $targetFolder -Force
Remove-Item $zip -Force

$gitExe = "$targetFolder\cmd\git.exe"
Write-Host "Checking git:"
& $gitExe --version
