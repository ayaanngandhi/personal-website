#!/usr/bin/env python3
"""Serve static files AND log every visit with IP, similar to Cellestina's analytics."""
import json
import os
import time
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, HTTPServer
from pathlib import Path

PORT = 3100
STATIC_DIR = Path(__file__).parent / "out"
LOG_FILE = Path(__file__).parent / "visit_logs.json"

class LoggingHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def log_visit(self):
        ip = self.headers.get("X-Forwarded-For", self.client_address[0])
        # If multiple IPs in X-Forwarded-For, take the first (original client)
        if "," in ip:
            ip = ip.split(",")[0].strip()

        visit = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "ip_address": ip,
            "user_agent": self.headers.get("User-Agent", ""),
            "path": self.path,
            "referrer": self.headers.get("Referer", ""),
            "method": self.command,
            "host": self.headers.get("Host", ""),
        }

        # Read existing logs
        visits = []
        if LOG_FILE.exists():
            try:
                with open(LOG_FILE, "r") as f:
                    content = f.read().strip()
                    if content:
                        visits = json.loads(content)
            except (json.JSONDecodeError, Exception):
                visits = []

        visits.append(visit)

        # Keep only last 10000
        if len(visits) > 10000:
            visits = visits[-10000:]

        with open(LOG_FILE, "w") as f:
            json.dump(visits, f, indent=2, ensure_ascii=False)

        # Print to console
        print(f"[{visit['timestamp']}] {ip} → {visit['path']} ({visit['user_agent'][:60] if visit['user_agent'] else '?'})")

    def do_GET(self):
        self.log_visit()
        super().do_GET()

    def do_POST(self):
        self.log_visit()
        super().do_POST()

    def do_HEAD(self):
        self.log_visit()
        super().do_HEAD()

    def log_message(self, format, *args):
        # Suppress default logging since we have our own
        pass

if __name__ == "__main__":
    os.chdir(str(STATIC_DIR))
    server = HTTPServer(("0.0.0.0", PORT), LoggingHandler)
    print(f"Serving {STATIC_DIR} on port {PORT} with IP logging")
    print(f"Logs → {LOG_FILE}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
