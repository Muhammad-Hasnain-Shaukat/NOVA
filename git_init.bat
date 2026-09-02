@echo off
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%ProgramFiles%\GitHub CLI;%PATH%"
cd /d "C:\Users\Doctor Computers\.gemini\antigravity-ide\scratch\NOVA"

if not exist ".git" (
    git init -b main
)

git config user.name "Muhammad-Hasnain-Shaukat"
git config user.email "mhshaukat01@gmail.com"

git status
git add .
git commit -m "feat: complete NOVA avant-garde cyberpunk fashion house web ecosystem"
git log -1 --oneline
