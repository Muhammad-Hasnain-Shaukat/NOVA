@echo off
set "GITDIR=%LOCALAPPDATA%\Programs\Git"
if not exist "%GITDIR%" mkdir "%GITDIR%"
echo Downloading MinGit...
curl -L -o "%TEMP%\mingit.zip" "https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip"
echo Extracting MinGit...
tar -xf "%TEMP%\mingit.zip" -C "%GITDIR%"
if exist "%TEMP%\mingit.zip" del "%TEMP%\mingit.zip"
echo Git verification:
"%GITDIR%\cmd\git.exe" --version
