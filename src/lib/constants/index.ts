export const APP_NAME = "tisini.co.ke-app-v1"

const prefix = APP_NAME;
type AppStates = "tisini-app-authState" | "tisini-app-quizState";

export const stateKeys: Record<AppStates, string> = {
  "tisini-app-authState": `${prefix}-authState`,
  "tisini-app-quizState": `${prefix}-quizState`,
};