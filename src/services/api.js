// src/services/api.js

const BASE_URL = "https://docve.azurewebsites.net/api";

// Generic request helper
async function request(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API Error (${res.status}): ${error}`);
  }

  return res.json().catch(() => null); // handle empty responses
}

/* ---------------------------------------
   DOCUMENTS
----------------------------------------*/

// GET /api/Documents
export const getDocuments = () => request("/Documents");

// GET /api/Documents/{id}
export const getDocumentById = (id) => request(`/Documents/${id}`);

// PUT /api/Documents/{id}
export const updateDocument = (id, data) =>
  request(`/Documents/${id}`, "PUT", data);

// DELETE /api/Documents/{id}
export const deleteDocument = (id) =>
  request(`/Documents/${id}`, "DELETE");
  
// GET /api/Documents/shelf/{shelfId}
export const getDocumentsByShelf = (shelfId) =>
  request(`/Documents/shelf/${shelfId}`);

// GET /api/Documents/search?query=name
export const searchDocuments = (query) =>
  request(`/Documents/search?name=${encodeURIComponent(query)}`);

// POST /api/Documents/upload  (multipart)
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/Documents/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("File upload failed");

  return res.json();
};

// POST /api/Documents/{id}/mark-indexed
export const markDocumentIndexed = (id) =>
  request(`/Documents/${id}/mark-indexed`, "POST");

// POST /api/Documents/{id}/mark-failed
export const markDocumentFailed = (id) =>
  request(`/Documents/${id}/mark-failed`, "POST");

// POST /api/Documents/{id}/mark-removed
export const markDocumentRemoved = (id) =>
  request(`/Documents/${id}/mark-removed`, "POST");

/* ---------------------------------------
   HEALTH
----------------------------------------*/

export const getHealth = () => request("/Health");

export const getHealthLive = () => request("/Health/live");

export const getHealthReady = () => request("/Health/ready");

export const getHealthVersion = () => request("/Health/version");

/* ---------------------------------------
   SHELVES
----------------------------------------*/

// GET /api/Shelves
export const getShelves = () => request("/Shelves");

// POST /api/Shelves
export const createShelf = (data) =>
  request("/Shelves", "POST", data);

// GET /api/Shelves/{id}
export const getShelfById = (id) =>
  request(`/Shelves/${id}`);

// PUT /api/Shelves/{id}
export const updateShelf = (id, data) =>
  request(`/Shelves/${id}`, "PUT", data);

// DELETE /api/Shelves/{id}
export const deleteShelf = (id) =>
  request(`/Shelves/${id}`, "DELETE");

// GET /api/Shelves/{id}/access
export const getShelfAccess = (id) =>
  request(`/Shelves/${id}/access`);

// POST /api/Shelves/{id}/access
export const grantShelfAccess = (id, data) =>
  request(`/Shelves/${id}/access`, "POST", data);

// DELETE /api/Shelves/{id}/access/{userId}
export const revokeShelfAccess = (id, userId) =>
  request(`/Shelves/${id}/access/${userId}`, "DELETE");

/* ---------------------------------------
   USERS
----------------------------------------*/

// GET /api/Users
export const getUsers = () => request("/Users");

// POST /api/Users
export const createUser = (data) =>
  request("/Users", "POST", data);

// GET /api/Users/{id}
export const getUserById = (id) =>
  request(`/Users/${id}`);

// PUT /api/Users/{id}
export const updateUser = (id, data) =>
  request(`/Users/${id}`, "PUT", data);

// DELETE /api/Users/{id}
export const deleteUser = (id) =>
  request(`/Users/${id}`, "DELETE");

// POST /api/Users/{id}/change-password
export const changePassword = (id, data) =>
  request(`/Users/${id}/change-password`, "POST", data);

// GET /api/Users/count
export const getUserCount = () =>
  request("/Users/count");

// POST /api/Users/{id}/profile
export const createUserProfile = (id, data) =>
  request(`/Users/${id}/profile`, "POST", data);

// PUT /api/Users/{id}/profile
export const updateUserProfile = (id, data) =>
  request(`/Users/${id}/profile`, "PUT", data);

// DELETE /api/Users/{id}/profile
export const deleteUserProfile = (id) =>
  request(`/Users/${id}/profile`, "DELETE");
