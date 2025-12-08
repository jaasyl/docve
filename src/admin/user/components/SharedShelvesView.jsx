import React, { useState, useEffect } from "react";
import "./SharedShelvesView.css";
import { getAllShelves, getShelfAccess, removeShelfAccess } from "../../../services/shelvesApi";

export default function SharedShelvesView() {
    // State management
    const [shelves, setShelves] = useState([]);
    const [selectedShelfId, setSelectedShelfId] = useState(null);
    const [currentShelf, setCurrentShelf] = useState(null);
    const [accessList, setAccessList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessLoading, setAccessLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all shelves on component mount
    useEffect(() => {
        fetchShelves();
    }, []);

    // Fetch access list when selected shelf changes
    useEffect(() => {
        if (selectedShelfId) {
            fetchShelfAccess(selectedShelfId);
        }
    }, [selectedShelfId]);

    /**
     * Fetch all shelves from the backend
     */
    const fetchShelves = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllShelves();
            setShelves(data);

            // Set the first shelf as selected if available
            if (data && data.length > 0) {
                setSelectedShelfId(data[0].id);
                setCurrentShelf(data[0]);
            }
        } catch (err) {
            console.error("Error fetching shelves:", err);
            setError("Failed to load shelves. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /**
     * Fetch access list for a specific shelf
     */
    const fetchShelfAccess = async (shelfId) => {
        try {
            setAccessLoading(true);
            const data = await getShelfAccess(shelfId);
            setAccessList(data || []);
        } catch (err) {
            console.error("Error fetching shelf access:", err);
            setAccessList([]);
        } finally {
            setAccessLoading(false);
        }
    };

    /**
     * Handle shelf selection change
     */
    const handleShelfChange = (e) => {
        const shelfId = e.target.value;
        setSelectedShelfId(shelfId);
        const shelf = shelves.find(s => s.id === shelfId);
        setCurrentShelf(shelf);
    };

    /**
     * Handle removing user access
     */
    const handleRemoveAccess = async (userId) => {
        if (!window.confirm("Are you sure you want to remove this user's access?")) {
            return;
        }

        try {
            await removeShelfAccess(selectedShelfId, userId);
            // Refresh the access list after successful deletion
            await fetchShelfAccess(selectedShelfId);
        } catch (err) {
            console.error("Error removing access:", err);
            alert("Failed to remove user access. Please try again.");
        }
    };

    /**
     * Format date to readable string
     */
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    /**
     * Generate user initials for avatar
     */
    const getInitials = (name) => {
        if (!name) return "?";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Loading state
    if (loading) {
        return (
            <div className="shared-shelves-container">
                <div className="shared-header">
                    <h1 className="shared-title">Shared Shelves & Permissions</h1>
                    <p className="shared-subtitle">Loading shelves...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="shared-shelves-container">
                <div className="shared-header">
                    <h1 className="shared-title">Shared Shelves & Permissions</h1>
                    <p className="shared-subtitle" style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    // No shelves state
    if (!shelves || shelves.length === 0) {
        return (
            <div className="shared-shelves-container">
                <div className="shared-header">
                    <h1 className="shared-title">Shared Shelves & Permissions</h1>
                    <p className="shared-subtitle">No shared shelves found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="shared-shelves-container">
            <div className="shared-header">
                <h1 className="shared-title">Shared Shelves & Permissions</h1>
                <p className="shared-subtitle">Manage access and information for shared document collections.</p>
            </div>

            <div className="shelf-selector-section">
                <label className="shelf-selector-label">Select a Shared Shelf</label>
                <select
                    className="shelf-selector"
                    value={selectedShelfId || ''}
                    onChange={handleShelfChange}
                >
                    {shelves.map((shelf) => (
                        <option key={shelf.id} value={shelf.id}>
                            {shelf.name}
                        </option>
                    ))}
                </select>
            </div>

            {currentShelf && (
                <div className="shared-content">
                    {/* Shelf Info Section */}
                    <div className="shelf-info-section">
                        <h2 className="section-title">Shelf Info</h2>

                        <div className="info-item">
                            <div className="info-label">Name</div>
                            <div className="info-value">{currentShelf.name || "N/A"}</div>
                        </div>

                        <div className="info-item">
                            <div className="info-label">Description</div>
                            <div className="info-value description">{currentShelf.description || "No description available"}</div>
                        </div>

                        <div className="info-item">
                            <div className="info-label">Type</div>
                            <div className="info-value">{currentShelf.type || "N/A"}</div>
                        </div>

                        <div className="info-item">
                            <div className="info-label">Docs</div>
                            <div className="info-value">{currentShelf.documentCount || 0}</div>
                        </div>

                        <div className="info-item">
                            <div className="info-label">Created Date</div>
                            <div className="info-value">{formatDate(currentShelf.createdAt)}</div>
                        </div>
                    </div>

                    {/* Access Management Section */}
                    <div className="access-management-section">
                        <div className="section-header">
                            <h2 className="section-title">Access Management</h2>
                            <button className="btn-add-user">
                                <span className="material-symbols-outlined">add</span>
                                Add User
                            </button>
                        </div>

                        {accessLoading ? (
                            <p>Loading access list...</p>
                        ) : (
                            <table className="users-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Permission</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accessList.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                                                No users have access to this shelf yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        accessList.map((user) => (
                                            <tr key={user.userId || user.id}>
                                                <td>
                                                    <div className="user-info">
                                                        <div className="user-avatar">
                                                            {getInitials(user.userName || user.name)}
                                                        </div>
                                                        <div className="user-details">
                                                            <div className="user-name">{user.userName || user.name || "Unknown User"}</div>
                                                            <div className="user-email">{user.userEmail || user.email || "No email"}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="permission-badge">
                                                        {user.permission || user.role || "View"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => handleRemoveAccess(user.userId || user.id)}
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
