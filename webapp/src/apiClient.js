const API_BASE =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_BASE_URL || "/api"
    : "";

export const apiUrl = (path) => `${API_BASE}${path}`;