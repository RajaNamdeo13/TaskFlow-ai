#!/usr/bin/env bash
set -euo pipefail
OUTPUT="${1:-../TaskFlow-ai-postgres-fullstack.zip}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$(dirname "$OUTPUT")"
rm -f "$OUTPUT"
cd "$ROOT"
zip -qr "$OUTPUT" . -x 'node_modules/*' 'dist/*' 'dist-api/*' '.git/*' '.env' '.env.*' 'coverage/*'
echo "Created $OUTPUT"
