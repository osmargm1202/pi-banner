import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export interface AgentStatusConfig {
	showWidget: boolean;
	showModel: boolean;
	showTokens: boolean;
	showCost: boolean;
	showPersistence: boolean;
	showSummary: boolean;
	showActivity: boolean;
}

export const AGENT_STATUS_CONFIG_DEFAULTS: AgentStatusConfig = {
	showWidget: true,
	showModel: true,
	showTokens: true,
	showCost: false,
	showPersistence: true,
	showSummary: true,
	showActivity: true,
};

export function getAgentStatusConfigPath(): string {
	return join(homedir(), ".pi", "agent", "pi-banner.json");
}

function readConfig(configPath = getAgentStatusConfigPath()): Partial<AgentStatusConfig> {
	if (!existsSync(configPath)) return {};
	try {
		const value = JSON.parse(readFileSync(configPath, "utf8"));
		return value && typeof value === "object" && !Array.isArray(value) ? value : {};
	} catch {
		return {};
	}
}

export function loadAgentStatusConfig(configPath?: string): AgentStatusConfig {
	const raw = readConfig(configPath);
	return {
		showWidget: typeof raw.showWidget === "boolean" ? raw.showWidget : AGENT_STATUS_CONFIG_DEFAULTS.showWidget,
		showModel: typeof raw.showModel === "boolean" ? raw.showModel : AGENT_STATUS_CONFIG_DEFAULTS.showModel,
		showTokens: typeof raw.showTokens === "boolean" ? raw.showTokens : AGENT_STATUS_CONFIG_DEFAULTS.showTokens,
		showCost: typeof raw.showCost === "boolean" ? raw.showCost : AGENT_STATUS_CONFIG_DEFAULTS.showCost,
		showPersistence: typeof raw.showPersistence === "boolean" ? raw.showPersistence : AGENT_STATUS_CONFIG_DEFAULTS.showPersistence,
		showSummary: typeof raw.showSummary === "boolean" ? raw.showSummary : AGENT_STATUS_CONFIG_DEFAULTS.showSummary,
		showActivity: typeof raw.showActivity === "boolean" ? raw.showActivity : AGENT_STATUS_CONFIG_DEFAULTS.showActivity,
	};
}

export function saveAgentStatusConfig(config: AgentStatusConfig, configPath = getAgentStatusConfigPath()): void {
	mkdirSync(dirname(configPath), { recursive: true });
	writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
}
