import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("package remains a banner scaffold and does not own agent-status widgets", () => {
  assert.equal(pkg.name, "pi-banner");
  assert.deepEqual(pkg.pi.extensions, ["./extensions/banner.ts", "./extensions/orgm.ts"]);
  assert.ok(pkg.peerDependencies["@earendil-works/pi-coding-agent"]);

  const source = readFileSync(new URL("../extensions/banner.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /SUBAGENTS_EVENT|setWidget|orgm-agent-status/);

  const orgmSource = readFileSync(new URL("../extensions/orgm.ts", import.meta.url), "utf8");
  assert.match(orgmSource, /orgm-header/);
  assert.match(orgmSource, /orgm-extension/);
});
