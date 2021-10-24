import { useState, useEffect, useRef } from 'react';


export default function useSearch(data: any[]) {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(data);

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const results = data.filter(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm]);

    return { searchTerm, handleChange, searchResults };
}