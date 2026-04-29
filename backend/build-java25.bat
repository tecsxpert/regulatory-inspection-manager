@echo off
cd /d "c:\Users\MSI 1\regulatory-inspection-manager\backend"
set JAVA_HOME=C:\Users\MSI 1\.jdk\jdk-25
"C:\Users\MSI 1\.maven\maven-3.9.15\bin\mvn" --version
echo.
echo Building with Java 25...
"C:\Users\MSI 1\.maven\maven-3.9.15\bin\mvn" clean test-compile -DskipTests
pause
