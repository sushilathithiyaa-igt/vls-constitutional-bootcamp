// Loopback-only stand-in for the lead destination. Nothing here talks to the internet.
import http from "node:http";

const port = Number(process.env.MOCK_PORT ?? 4545);
let received = [];

const server = http.createServer((req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };
  if (req.url === "/__health") return send(200, { ok: true });
  if (req.url === "/__received" && req.method === "GET") return send(200, received);
  if (req.url === "/__reset" && req.method === "POST") {
    received = [];
    return send(200, { ok: true });
  }
  if (req.url === "/lead" && req.method === "POST") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      let body = {};
      try {
        body = JSON.parse(raw);
      } catch {}
      received.push({ auth: req.headers.authorization ?? null, body });
      // Simulated outage for the failure test; brief delay so double-click protection is observable.
      const fail = typeof body.name === "string" && body.name.includes("Fail Case");
      setTimeout(() => send(fail ? 500 : 200, { ok: !fail }), 400);
    });
    return;
  }
  send(404, { error: "not found" });
});

server.listen(port, "127.0.0.1", () => console.log(`mock lead server on 127.0.0.1:${port}`));
