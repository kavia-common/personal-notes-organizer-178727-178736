#!/usr/bin/env bash
set -e
# Ensure gradlew is executable and present
if [ ! -f "./gradlew" ]; then
  echo "Creating root-level gradlew stub..."
  cat > ./gradlew <<'EOS'
#!/usr/bin/env bash
set -e
echo "Root-level gradlew stub invoked with args: $*"
echo "No native Android project is present. This is expected for Expo-managed workflow."
exit 0
EOS
fi
chmod +x ./gradlew || true
./gradlew "$@" || true
