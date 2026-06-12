import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const extensionsRoot = "extensions";
const coreAlwaysOn = new Set(["extensions/orgm.ts"]);

function collectTypeScriptFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) return entry.name === "lib" ? [] : collectTypeScriptFiles(fullPath);
		return entry.isFile() && entry.name.endsWith(".ts") ? [fullPath] : [];
	});
}

for (const file of collectTypeScriptFiles(extensionsRoot)) {
	const rel = relative(process.cwd(), file);
	if (coreAlwaysOn.has(rel) || !statSync(file).isFile()) continue;
	const source = readFileSync(file, "utf8");
	if (!source.includes("export default function")) continue;
	assert.match(source, /isOrgmExtensionEnabled\(/, `${rel} must check orgm extension enabled config`);
}

const bannerSource = readFileSync("extensions/banner.ts", "utf8");
assert.match(bannerSource, /isOrgmExtensionEnabled\("banner"\)/, "banner scaffold must default through orgm extension config");
