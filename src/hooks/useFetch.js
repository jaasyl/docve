import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching
 * @param {Function} fetchFunction - Async function that returns data
 * @param {Array} dependencies - Dependencies to re-run the fetch
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetch = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]); // fetchFunction should be memoized or stable

    useEffect(() => {
        fetchData();
    }, [fetchData, ...dependencies]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetch;
