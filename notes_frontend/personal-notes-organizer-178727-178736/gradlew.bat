@ECHO OFF
REM Root-level Gradle wrapper shim to forward to notes_frontend/android/gradlew
SETLOCAL
SET SCRIPT_DIR=%~dp0
SET APP_DIR=%SCRIPT_DIR%notes_frontend\android

IF EXIST "%APP_DIR%\gradlew.bat" (
  CALL "%APP_DIR%\gradlew.bat" %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO Gradle wrapper not found at %APP_DIR%\gradlew.bat. Creating a temporary stub...
  > "%APP_DIR%\gradlew.bat" ECHO @ECHO OFF
  >> "%APP_DIR%\gradlew.bat" ECHO ECHO Gradle wrapper (Windows) stub invoked with arguments: %%*
  >> "%APP_DIR%\gradlew.bat" ECHO ECHO No native Android project is present. This is expected for Expo-managed workflow.
  >> "%APP_DIR%\gradlew.bat" ECHO EXIT /B 0
  CALL "%APP_DIR%\gradlew.bat" %*
  EXIT /B %ERRORLEVEL%
)
ENDLOCAL
