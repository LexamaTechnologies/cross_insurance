#!/usr/bin/env bash
# start.sh — Cross Insurance dev environment
#
# Starts the Django backend (port 8000) and Next.js frontend (port 3000).
# PostgreSQL is expected to be running at login (registered via brew services).
#
# Usage:
#   ./start.sh          start both servers
#   ./start.sh stop     kill both servers
#   ./start.sh logs     tail logs from both servers

set -euo pipefail

REPO="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$REPO/backend"
FRONTEND_DIR="$REPO/frontend"
VENV_PYTHON="$REPO/.venv/bin/python"
DJANGO_LOG="/tmp/cross_insurance_django.log"
NEXTJS_LOG="/tmp/cross_insurance_nextjs.log"

# ── helpers ────────────────────────────────────────────────────────────────────

green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }

pg_running() {
  pg_isready -q 2>/dev/null
}

stop_servers() {
  yellow "Stopping Django and Next.js..."
  pkill -f "manage.py runserver" 2>/dev/null && green "  Django stopped." || yellow "  Django was not running."
  pkill -f "next dev"            2>/dev/null && green "  Next.js stopped." || yellow "  Next.js was not running."
  exit 0
}

tail_logs() {
  echo "=== Django log: $DJANGO_LOG"
  echo "=== Next.js log: $NEXTJS_LOG"
  tail -f "$DJANGO_LOG" "$NEXTJS_LOG"
  exit 0
}

# ── dispatch ───────────────────────────────────────────────────────────────────

case "${1:-}" in
  stop) stop_servers ;;
  logs) tail_logs ;;
esac

# ── pre-flight checks ──────────────────────────────────────────────────────────

echo ""
green "Cross Insurance — starting dev environment"
echo ""

# PostgreSQL
if ! pg_running; then
  yellow "PostgreSQL is not running — starting it..."
  brew services start postgresql@14
  sleep 3
  if ! pg_running; then
    red "ERROR: PostgreSQL failed to start. Check: brew services info postgresql@14"
    exit 1
  fi
fi
green "  [ok] PostgreSQL"

# Python venv
if [[ ! -x "$VENV_PYTHON" ]]; then
  red "ERROR: Virtual environment not found at $REPO/.venv"
  red "       Create it with: python3 -m venv .venv && .venv/bin/pip install -r backend/requirements.txt"
  exit 1
fi
green "  [ok] Python venv"

# Kill any previous instances
pkill -f "manage.py runserver" 2>/dev/null || true
pkill -f "next dev"            2>/dev/null || true
sleep 1

# ── start Django ───────────────────────────────────────────────────────────────

echo ""
yellow "Starting Django backend..."
(cd "$BACKEND_DIR" && "$VENV_PYTHON" manage.py runserver > "$DJANGO_LOG" 2>&1) &
DJANGO_PID=$!

# wait up to 10 s for Django to respond
for i in $(seq 1 10); do
  sleep 1
  if curl -s -o /dev/null -w "" http://127.0.0.1:8000/ 2>/dev/null; then
    break
  fi
  # also accept a crash (process gone)
  if ! kill -0 $DJANGO_PID 2>/dev/null; then
    red "ERROR: Django crashed at startup. Check log: $DJANGO_LOG"
    tail -20 "$DJANGO_LOG"
    exit 1
  fi
done
green "  Django backend  →  http://127.0.0.1:8000"
green "                     http://127.0.0.1:8000/api/"
green "                     http://127.0.0.1:8000/admin/"

# ── start Next.js ──────────────────────────────────────────────────────────────

echo ""
yellow "Starting Next.js frontend..."
(cd "$FRONTEND_DIR" && npm run dev > "$NEXTJS_LOG" 2>&1) &
NEXTJS_PID=$!

# wait up to 30 s for Next.js (Turbopack can be slow on first run)
for i in $(seq 1 30); do
  sleep 1
  if grep -q "Ready in\|started server on" "$NEXTJS_LOG" 2>/dev/null; then
    break
  fi
  if ! kill -0 $NEXTJS_PID 2>/dev/null; then
    red "ERROR: Next.js crashed at startup. Check log: $NEXTJS_LOG"
    tail -20 "$NEXTJS_LOG"
    exit 1
  fi
done
green "  Next.js frontend →  http://localhost:3000"

# ── done ───────────────────────────────────────────────────────────────────────

echo ""
green "Both servers are running."
echo ""
echo "  Logs:    ./start.sh logs"
echo "  Stop:    ./start.sh stop"
echo "  Django:  $DJANGO_LOG"
echo "  Next.js: $NEXTJS_LOG"
echo ""
