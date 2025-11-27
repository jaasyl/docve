import React, { useState } from "react";
import "./CreateShelfModal.css";

export default function CreateShelfModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Personal");

    if (!isOpen) return null;

    const handleSave = () => {
        if (!name.trim()) return;
        onSave({ name, description, type });
        setName("");
        setDescription("");
        setType("Personal");
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Shelf</h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Shelf Name <span className="required">*</span></label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Q4 Marketing Reports"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description (Optional)</label>
                        <textarea
                            className="form-textarea"
                            placeholder="All marketing materials and performance reports for Q4 2023."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Shelf Type</label>
                        <div className="shelf-type-selector">
                            <button
                                className={`type-option ${type === "Personal" ? "active" : ""}`}
                                onClick={() => setType("Personal")}
                            >
                                <span className="material-symbols-outlined">person</span>
                                Personal
                            </button>
                            <button
                                className={`type-option ${type === "Shared" ? "active" : ""}`}
                                onClick={() => setType("Shared")}
                            >
                                <span className="material-symbols-outlined">group</span>
                                Shared
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-save" onClick={handleSave}>Save Shelf</button>
                </div>
            </div>
        </div>
    );
}
