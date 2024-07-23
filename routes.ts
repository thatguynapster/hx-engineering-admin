export const routes = {
  overview: { index: "/dashboard/overview" },
  inventory: {
    products: "/dashboard/inventory/products",
    add: "/dashboard/inventory/add",
    categories: "/dashboard/inventory/categories",
    details: "/dashboard/inventory/:product_id/:tab",
    edit: "/dashboard/inventory/edit",
  },
  orders: { index: "/dashboard/orders" },
  announcements: { index: "/dashboard/announcements" },
};

/**
 * An array of routes accessible to the public. These routes do not require auth
 * @type {string}
 */
export const publicPrefix: string = "/api/public";

/**
 * An array of routes used for authentication. These routes will redirect logged in users to DEFAULT_LOGIN_REDIRECT
 * @type {string}
 */
export const authRoutes: string = "/";

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
export const DEFAULT_LOGIN_REDIRECT: string = routes.inventory.products;
