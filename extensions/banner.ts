import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { isOrgmExtensionEnabled } from "./lib/orgm-extension-config.ts";

export default function (_pi: ExtensionAPI) {
	if (!isOrgmExtensionEnabled("banner")) return;
	// pi-banner scaffold: banner/header work lives here later.
	// Agent status widgets belong to pi-subagents.
}
