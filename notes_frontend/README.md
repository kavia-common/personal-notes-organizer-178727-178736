# Notes Frontend (Expo React Native)

This app implements a simple personal notes application with:
- Notes list (search, delete, tap to edit)
- Note editor (create and update)
- Local persistence using SQLite
- Ocean Professional theme
- Basic navigation and a floating action button

Getting started:
1. Install dependencies
   npm install

2. Run in web preview (port 3000)
   npm run web

3. Run on device or emulator
   npm start
   Then choose: `a` for Android emulator, `i` for iOS simulator, or scan the QR with Expo Go.

Notes:
- Android native Gradle check in CI will fail if the native project isn't prebuilt. This does not affect the web/mobile preview usage. If needed, run:
   npm run prebuild:android
  and then build via Android Studio or Gradle.
- SQLite requires device or a compatible web shim. On web in development, behaviour may be limited. On mobile (Expo Go or dev builds) it works fully.
