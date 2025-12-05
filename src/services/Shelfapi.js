import axios from "axios";

const API_BASE_URL = "https://docve.azurewebsites.net/api";

// Create a shelf
export const createShelf = async (data, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/Shelves`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Get all shelves (with optional search)
export const getShelves = async (token, search = "") => {
    const url = search
        ? `${API_BASE_URL}/Shelves?search=${encodeURIComponent(search)}`
        : `${API_BASE_URL}/Shelves`;

    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    return response.data;
};

// Get a single shelf by ID
export const getShelfById = async (shelfId, token) => {
    const response = await axios.get(
        `${API_BASE_URL}/Shelves/${shelfId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Update a shelf
export const updateShelf = async (shelfId, data, token) => {
    const response = await axios.put(
        `${API_BASE_URL}/Shelves/${shelfId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Delete a shelf
export const deleteShelf = async (shelfId, token) => {
    const response = await axios.delete(
        `${API_BASE_URL}/Shelves/${shelfId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Get all users with access to a shelf
export const getShelfAccess = async (shelfId, token) => {
    const response = await axios.get(
        `${API_BASE_URL}/Shelves/${shelfId}/access`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Add user access to a shelf
export const addShelfAccess = async (shelfId, data, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/Shelves/${shelfId}/access`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};

// Remove user access from a shelf
export const removeShelfAccess = async (shelfId, userId, token) => {
    const response = await axios.delete(
        `${API_BASE_URL}/Shelves/${shelfId}/access/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
    );
    return response.data;
};
