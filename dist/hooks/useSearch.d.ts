export default function useSearch(data: any[]): {
    searchTerm: string;
    handleChange: (event: Event) => void;
    searchResults: any[];
};
