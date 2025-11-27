import React, { useState } from "react";
import "./SharedShelvesView.css";

export default function SharedShelvesView() {
    const [selectedShelf, setSelectedShelf] = useState("Q4 Marketing Strategy");

    // Sample data
    const sharedShelves = [
        {
            name: "Q4 Marketing Strategy",
            description: "All documents related to the marketing strategy for the upcoming quarter.",
            type: "Team",
            docs: 12,
            createdDate: "October 26, 2023",
            users: [
                {
                    name: "Olivia Rhye",
                    email: "olivia@untitledui.com",
                    permission: "Manage Shelf",
                    avatar: "OR"
                },
                {
                    name: "Phoenix Baker",
                    email: "phoenix@untitledui.com",
                    permission: "Edit Documents",
                    avatar: "PB"
                },
                {
                    name: "Lana Steiner",
                    email: "lana@untitledui.com",
                    permission: "View",
                    avatar: "LS"
                }
            ]
        },
        {
            name: "Engineering Docs",
            description: "Technical documentation and specifications for engineering projects.",
            type: "Team",
            docs: 24,
            createdDate: "September 15, 2023",
            users: [
                {
                    name: "Alex Johnson",
                    email: "alex@untitledui.com",
                    permission: "Manage Shelf",
                    avatar: "AJ"
                }
            ]
        }
    ];

    const currentShelf = sharedShelves.find(s => s.name === selectedShelf) || sharedShelves[0];

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
                    value={selectedShelf}
                    onChange={(e) => setSelectedShelf(e.target.value)}
                >
                    {sharedShelves.map((shelf) => (
                        <option key={shelf.name} value={shelf.name}>
                            {shelf.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="shared-content">
                {/* Shelf Info Section */}
                <div className="shelf-info-section">
                    <h2 className="section-title">Shelf Info</h2>

                    <div className="info-item">
                        <div className="info-label">Name</div>
                        <div className="info-value">{currentShelf.name}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">Description</div>
                        <div className="info-value description">{currentShelf.description}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">Type</div>
                        <div className="info-value">{currentShelf.type}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">Docs</div>
                        <div className="info-value">{currentShelf.docs}</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">Created Date</div>
                        <div className="info-value">{currentShelf.createdDate}</div>
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

                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Permission</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentShelf.users.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar">{user.avatar}</div>
                                            <div className="user-details">
                                                <div className="user-name">{user.name}</div>
                                                <div className="user-email">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="permission-badge">{user.permission}</span>
                                    </td>
                                    <td>
                                        <button className="btn-delete">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
