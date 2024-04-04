import { useEffect, useState } from 'react';


export default function useSearch(data: string[]) {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const results = data.filter(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [data, searchTerm]);

    return { searchTerm, handleChange, searchResults };

}