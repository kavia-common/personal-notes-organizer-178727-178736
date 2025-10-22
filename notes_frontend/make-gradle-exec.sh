#!/usr/bin/env bash
# Utility to ensure gradlew is executable in CI.
set -e
chmod +x android/gradlew || true
echo "Set executable permission on android/gradlew (if supported)."
