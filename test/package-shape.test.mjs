import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("package ships the real agent status banner extension", () => {
  assert.equal(pkg.name, "pi-banner");
  assert.deepEqual(pkg.pi.extensions, ["./extensions/agent-status.ts"]);
  assert.ok(pkg.peerDependencies["@earendil-works/pi-coding-agent"]);
  assert.ok(pkg.peerDependencies["@earendil-works/pi-tui"]);

  const source = readFileSync(new URL("../extensions/agent-status.ts", import.meta.url), "utf8");
  assert.match(source, /SUBAGENTS_EVENT/);
  assert.match(source, /setWidget/);
  assert.match(source, /orgm-agent-status/);
});
