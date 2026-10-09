// Backend origin, e.g. https://api.frenchcert.org (set per environment in .env.*)
const BASE_URL = import.meta.env.VITE_API_URL || '';

export { BASE_URL };
