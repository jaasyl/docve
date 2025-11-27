import React, { useState } from "react";
import PageHeader from "./PageHeader";
import Tabs from "./Tabs";
import PersonalShelvesView from "./PersonalShelvesView";
import SharedShelvesView from "./SharedShelvesView";
import CreateShelfModal from "./CreateShelfModal";
import "../pages/myshelf.css"; // Import css from pages directory as it was in MyShelves

export default function ShelvesView({ rows, onCreateShelf }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <>
            <PageHeader onCreateClick={() => setIsModalOpen(true)} />
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "personal" ? (
                <PersonalShelvesView rows={rows} />
            ) : (
                <SharedShelvesView />
            )}

            <CreateShelfModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={onCreateShelf}
            />
        </>
    );
}
