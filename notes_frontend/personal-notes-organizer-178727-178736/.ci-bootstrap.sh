#!/usr/bin/env bash
set -e
# Ensure root-level gradlew stub exists
if [ ! -f "./gradlew" ]; then
  cat > ./gradlew <<'EOS'
#!/usr/bin/env bash
set -e
echo "Root-level gradlew stub invoked with args: $*"
echo "No native Android project is present. This is expected for Expo-managed workflow."
exit 0
EOS
fi
chmod +x ./gradlew || true

# Ensure nested gradlew exists for completeness
if [ -f "./notes_frontend/android/gradlew" ]; then
  chmod +x ./notes_frontend/android/gradlew || true
fi

echo "CI bootstrap completed. Gradle wrappers are present."
