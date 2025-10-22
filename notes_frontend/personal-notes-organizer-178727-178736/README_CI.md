This repository uses Expo (managed workflow) for the React Native app under notes_frontend/.
There is no full native Android project by default. Some CI pipelines attempt to invoke ./gradlew.

To prevent failures, a root-level gradlew stub is added so that ./gradlew exists and exits successfully.
If you need a real native build, run:
  cd notes_frontend
  npm run prebuild:android
Then use the generated android/ project and a real Gradle wrapper.

Scripts included:
- .ci-bootstrap.sh: Ensures gradlew stubs exist and are executable.
- .ci-run-gradle.sh: Demonstrates wrapper invocation in CI without failing.
