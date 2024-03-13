/**
 * An array of routes accessible to the public. These routes do not require auth
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/api/public"];

/**
 * An array of routes used for authentication. These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes: string[] = ["/"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The prefix for all API routes
 */
export const apiRoutes: string = "/api";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard/inventory";
