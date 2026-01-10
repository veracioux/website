/**
 * Environment variables, centralized for traceability.
 */
const environment = {
  IS_STAGING: process.env.IS_STAGING == "true",
} as const;

export default environment;
