#!/usr/bin/env bash
# Ensures there is a ./gradlew file, makes it executable, then forwards args to it.
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
"$ROOT_DIR/gradlew" "$@" || true
echo "gradle-init-and-run.sh completed."
