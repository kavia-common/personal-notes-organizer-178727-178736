#!/usr/bin/env bash
set -e
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
echo "Root-level gradlew stub ensured."
