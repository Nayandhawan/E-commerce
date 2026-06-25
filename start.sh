#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Load environment variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
  echo "ERROR: .env file not found. Copy .env.example to .env and fill in values."
  exit 1
fi

# ── Build Angular ───────────────────────────────────────────────────────────
echo ""
echo "Building Angular..."
cd EcomUI

# Install deps if node_modules is missing or package.json changed
if [ ! -d node_modules ] || [ package.json -nt node_modules ]; then
  npm install --silent
fi

# Clear old static output and rebuild
rm -rf "$SCRIPT_DIR/src/main/resources/static/browser"
npm run build -- --configuration production
cd "$SCRIPT_DIR"

echo "Angular build complete."

# ── Free port 8080 if already in use ───────────────────────────────────────
PIDS=$(lsof -ti:8080 2>/dev/null || true)
if [ -n "$PIDS" ]; then
  echo "Stopping existing process on port 8080 (PID: $PIDS)..."
  echo "$PIDS" | xargs kill -9
fi

# ── Start Spring Boot ───────────────────────────────────────────────────────
echo ""
echo "Starting Spring Boot on http://localhost:8080 ..."
echo "Press Ctrl+C to stop."
echo ""

./mvnw spring-boot:run \
  -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=default"
