#!/usr/bin/env bash
# Rebuilds public/evenso/demo/: the Evenso app's own web build in demo mode (no Firebase, trips kept
# in the browser), which the /evenso/ page shows inside a phone. Run it again whenever Evenso changes.
#
#   tools/build-evenso-demo.sh [path to the Evenso app]   (default: ~/Desktop/Fox/Evenso/app)
#
# The Evenso checkout is only read: the build runs on a throwaway copy.
set -euo pipefail

APP="${1:-$HOME/Desktop/Fox/Evenso/app}"
SITE="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$SITE/public/evenso/demo"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# A real copy, not a symlinked node_modules: assets from outside the project would be exported under
# their absolute path, which puts this machine's folder names in the build. -c clones on APFS (instant).
cp -cR "$APP" "$WORK/app" 2>/dev/null || cp -R "$APP" "$WORK/app"
cd "$WORK/app"
rm -rf .git .env .env.* .expo dist coverage

# Served from /evenso/demo/ on the site.
node -e '
  const fs = require("fs");
  const config = JSON.parse(fs.readFileSync("app.json", "utf8"));
  config.expo.experiments = { ...config.expo.experiments, baseUrl: "/evenso/demo" };
  fs.writeFileSync("app.json", JSON.stringify(config, null, 2));
'

# Sign-in's name placeholder is a real person's name; the demo shows only made-up ones.
REAL_NAME="$(sed -nE 's/.*placeholder="([A-Z][a-z]+)".*/\1/p' src/app/sign-in.tsx | head -1)"
sed -i.bak -E 's/placeholder="[A-Z][a-z]+"/placeholder="Arun"/' src/app/sign-in.tsx && rm src/app/sign-in.tsx.bak
[ "$REAL_NAME" = Arun ] && REAL_NAME=''

# No Firebase settings at all means demo mode, so ignore .env files and any exported values.
unset EXPO_PUBLIC_FIREBASE_API_KEY EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN EXPO_PUBLIC_FIREBASE_PROJECT_ID \
  EXPO_PUBLIC_FIREBASE_APP_ID EXPO_PUBLIC_FIREBASE_EMULATOR_HOST
EXPO_NO_DOTENV=1 EXPO_NO_TELEMETRY=1 CI=1 npx expo export -p web --output-dir "$WORK/dist"

# Stop if a local path, that real name or Firebase settings (an API key or Evenso's project) made it
# into the build. The Firebase SDK itself is always bundled; demo mode just never starts it.
if grep -rliE "/Users/|AIza[0-9A-Za-z_-]{20,}|evenso-2026${REAL_NAME:+|$REAL_NAME}" "$WORK/dist"; then
  echo "The files above contain a local path, a real name or Firebase settings. Not copied." >&2
  exit 1
fi

rm -rf "$OUT"
mkdir -p "$(dirname "$OUT")"
cp -R "$WORK/dist" "$OUT"
echo "Built public/evenso/demo from Evenso $(git -C "$APP" rev-parse --short HEAD)."
