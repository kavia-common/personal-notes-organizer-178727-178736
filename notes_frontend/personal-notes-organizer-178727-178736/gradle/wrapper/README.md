This is a placeholder for the Gradle wrapper directory to satisfy CI tools that expect a Gradle wrapper structure at the repository root.

In an Expo-managed project, native Android is not included by default. If you need a real Gradle wrapper:
1) Generate nativeAndroid with:
   cd notes_frontend
   npm run prebuild:android

2) Then commit the real gradle wrapper files produced under android/ (including gradle-wrapper.jar, gradlew, gradlew.bat, and gradle/wrapper/*).
