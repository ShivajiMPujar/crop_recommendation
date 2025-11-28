/**
 * Service to handle fetching government schemes.
 * Now uses real API endpoints.
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Helper to ensure we don't double up on /api if it's already in the base URL
const getEndpoint = (path) => {
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // If base URL already ends with /api, and path starts with api/, remove one
    if (baseUrl.endsWith('/api') && cleanPath.startsWith('api/')) {
        return `${baseUrl}/${cleanPath.replace('api/', '')}`;
    }

    // If base URL doesn't end with /api, and path doesn't start with api/, add it?
    // Actually, let's just be explicit.
    // If env var has /api, we use it. If not, we assume we need to add /api for our specific calls if we were hardcoding.
    // But here, the code was `${API_BASE_URL}/api/schemes`.

    // Simplest fix: Check if API_BASE_URL includes /api
    if (baseUrl.endsWith('/api')) {
        return `${baseUrl}/${cleanPath.replace(/^api\//, '')}`;
    }

    return `${baseUrl}/${cleanPath}`;
};

export const getSchemes = async () => {
    try {
        const url = getEndpoint('api/schemes');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching schemes: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch schemes:", error);
        throw error;
    }
};

export const getLatestSchemes = async (limit = 4) => {
    try {
        const url = getEndpoint(`api/schemes/latest?limit=${limit}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching latest schemes: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch latest schemes:", error);
        throw error;
    }
};
