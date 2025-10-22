The root-level Gradle wrapper (./gradlew) in this repository is a stub for CI purposes only.

Why:
- Some CI pipelines automatically try to run ./gradlew even for Expo-managed RN apps, which do not include native Android by default.
- To prevent CI from failing, we provide a stub that exits successfully.

What to do if you need a real native build:
- cd notes_frontend
- npm run prebuild:android
- Use the generated android/ directory and its gradle wrapper for builds.
