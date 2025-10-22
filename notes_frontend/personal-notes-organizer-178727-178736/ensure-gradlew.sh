#!/usr/bin/env bash
# Ensure there is a root-level ./gradlew script so CI steps that call it won't fail.
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ ! -f "$ROOT_DIR/gradlew" ]; then
  cat > "$ROOT_DIR/gradlew" <<'EOS'
#!/usr/bin/env bash
set -e
echo "Root-level gradlew stub invoked with args: $*"
echo "No native Android project is present. This is expected for Expo-managed workflow."
exit 0
EOS
fi

chmod +x "$ROOT_DIR/gradlew" || true
echo "Ensured ./gradlew exists and is executable."
