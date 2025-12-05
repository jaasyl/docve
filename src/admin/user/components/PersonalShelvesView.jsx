import React, { useState, useEffect } from "react";
import SearchBar from "./searchbar";
import ShelvesTable from "./shelvestable";
import Pagination from "./Pagination";
import { getShelves } from "../../../services/Shelfapi";

export default function PersonalShelvesView() {
    const [shelves, setShelves] = useState([]);
    const [search, setSearch] = useState("");

    const fetchShelves = async (searchText) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const data = await getShelves(token, searchText);

            // Map API data to match ShelvesTable expected format
            const formattedShelves = Array.isArray(data) ? data.map(shelf => ({
                id: shelf.id,
                name: shelf.name,
                type: shelf.type || "Personal",
                date: shelf.createdAt ? new Date(shelf.createdAt).toLocaleDateString() : "-",
                docs: shelf.documentCount || 0,
                hasError: false
            })) : [];

            setShelves(formattedShelves);
        } catch (error) {
            console.error("Error fetching shelves:", error);
        }
    };

    useEffect(() => {
        fetchShelves(search);
    }, [search]);

    const handleRefresh = () => {
        fetchShelves(search);
    };

    const handleEdit = (shelfData) => {
        // This can be expanded to open an edit modal
        // For now, just log the shelf data
        console.log("Edit shelf:", shelfData);
        // TODO: Open edit modal with shelfData
    };

    return (
        <div className="card">
            <SearchBar onSearch={setSearch} />
            <ShelvesTable rows={shelves} onRefresh={handleRefresh} onEdit={handleEdit} />
            <Pagination />
        </div>
    );
}
