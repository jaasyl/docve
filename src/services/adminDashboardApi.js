import api from './api';

/**
 * Admin Dashboard API Service
 * All functions use the centralized axios instance with automatic token injection
 */

// ==================== User Statistics ====================

/**
 * Get total user count
 * @returns {Promise<number>} Total number of users
 */
export const getUsersCount = async () => {
    const response = await api.get('/Users/count');
    return response.data;
};

/**
 * Get all users with optional filters
 * @param {Object} params - Query parameters (sort, limit, active, etc.)
 * @returns {Promise} Array of users
 */
export const getUsers = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/Users?${queryString}` : '/Users';
    const response = await api.get(url);
    return response.data;
};

/**
 * Get recently created users
 * @param {number} limit - Number of users to fetch (default: 5)
 * @returns {Promise} Array of recent users
 */
export const getRecentUsers = async (limit = 5) => {
    try {
        // Try to get users sorted by creation date
        const response = await api.get(`/Users?sort=createdAt&order=desc&limit=${limit}`);
        return response.data;
    } catch (err) {
        // Fallback: get all users and sort client-side
        const response = await api.get('/Users');
        const users = response.data || [];
        return users
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, limit);
    }
};

/**
 * Get active users count (today)
 * @returns {Promise<number>} Number of active users
 */
export const getActiveUsersCount = async () => {
    try {
        // Try to get active users with filter
        const response = await api.get('/Users?active=true');
        return Array.isArray(response.data) ? response.data.length : response.data;
    } catch (err) {
        // Fallback: return total users count
        const response = await api.get('/Users/count');
        return response.data;
    }
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise} Created user object
 */
export const createUser = async (userData) => {
    const response = await api.post('/Users', userData);
    return response.data;
};

/**
 * Get user by ID
 * @param {string|number} userId - User ID
 * @returns {Promise} User object
 */
export const getUserById = async (userId) => {
    const response = await api.get(`/Users/${userId}`);
    return response.data;
};

// ==================== Document Statistics ====================

/**
 * Get all documents
 * @returns {Promise} Array of documents
 */
export const getDocuments = async () => {
    const response = await api.get('/Documents');
    return response.data;
};

/**
 * Get total documents count
 * @returns {Promise<number>} Total number of documents
 */
export const getDocumentsCount = async () => {
    const response = await api.get('/Documents');
    return Array.isArray(response.data) ? response.data.length : 0;
};

/**
 * Search documents
 * @param {string} query - Search query
 * @returns {Promise} Array of matching documents
 */
export const searchDocuments = async (query) => {
    const response = await api.get(`/Documents/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

// ==================== System Health ====================

/**
 * Get overall system health
 * @returns {Promise} Health status object
 */
export const getHealth = async () => {
    const response = await api.get('/Health');
    return response.data;
};

/**
 * Get readiness status
 * @returns {Promise} Readiness status
 */
export const getHealthReady = async () => {
    const response = await api.get('/Health/ready');
    return response.data;
};

/**
 * Get liveness status
 * @returns {Promise} Liveness status
 */
export const getHealthLive = async () => {
    const response = await api.get('/Health/live');
    return response.data;
};

/**
 * Get API version
 * @returns {Promise} Version information
 */
export const getHealthVersion = async () => {
    const response = await api.get('/Health/version');
    return response.data;
};

// ==================== Activity & Analytics ====================

/**
 * Get recent activity/audit logs
 * Note: If your API doesn't have an activity endpoint,
 * this will use recent users as a fallback
 * @returns {Promise} Array of activity logs
 */
export const getRecentActivity = async () => {
    try {
        // Try to get activity logs if endpoint exists
        const response = await api.get('/Activity/recent?limit=10');
        return response.data;
    } catch (err) {
        // Fallback: Use recent users as activity
        const users = await getRecentUsers(3);
        return users.map(user => ({
            admin: 'System',
            action: `Created new user: ${user.email || user.username}`,
            time: user.createdAt || new Date().toISOString(),
        }));
    }
};

/**
 * Get dashboard statistics (combined call)
 * @returns {Promise} Object with all dashboard stats
 */
export const getDashboardStats = async () => {
    try {
        const [usersCount, activeUsers, documentsCount, health] = await Promise.all([
            getUsersCount(),
            getActiveUsersCount(),
            getDocumentsCount(),
            getHealth().catch(() => null),
        ]);

        return {
            totalUsers: usersCount,
            activeUsers: activeUsers,
            documentsProcessed: documentsCount,
            storageUsed: health?.storage || 'N/A',
            health: health,
        };
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        throw err;
    }
};
