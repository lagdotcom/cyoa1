import { GameAnalytics } from "gameanalytics";

const GA = GameAnalytics;

const gameKey = process.env.APP_ANALYTICS_GAME_KEY ?? "";
const secretKey = process.env.APP_ANALYTICS_SECRET_KEY ?? "";
const debugAnalytics = process.env.APP_ANALYTICS_DEBUG === "TRUE";
const buildVersion = process.env.APP_BUILD_VERSION ?? "unknown";

const disableKey = "disableAnalytics";
const disableValue = "TRUE";

export function isAnalyticsDisabled() {
  return localStorage.getItem(disableKey) === disableValue;
}

// TODO use this somewhere
export function setAnalyticsDisabled(disabled: boolean) {
  if (disabled) localStorage.setItem(disableKey, disableValue);
  else localStorage.removeItem(disableKey);

  GA.setEnabledEventSubmission(!disabled);
}

export function startAnalytics() {
  GA.setEnabledInfoLog(debugAnalytics);
  GA.setEnabledVerboseLog(debugAnalytics);

  GA.configureBuild(buildVersion);
  GA.initialize(gameKey, secretKey);
  GA.setEnabledEventSubmission(!isAnalyticsDisabled());
}

function sanitise(s: string) {
  return s.replace(/ /g, "_");
}

export function playerGotItem(name: string) {
  GA.addDesignEvent(`Item:Get:${sanitise(name)}`);
}
