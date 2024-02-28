import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, Message } from 'semantic-ui-react';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [originalResults, setOriginalResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/articles`
        );
        setOriginalResults(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredSuggestions = originalResults.filter((result) =>
      result.name.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} style={{ padding: 0 }}>
        <Dropdown
          placeholder="Rechercher..."
          search
          selection
          value={searchQuery}
          onSearchChange={handleSearchChange}
          options={suggestions.map((suggestion) => ({
            key: suggestion.id,
            text: suggestion.name,
            value: suggestion.name, // Valeur à envoyer à la fonction onSearch
            href: `/articles/${suggestion.id}`,
          }))}
        />
      </form>
      {loading && <Message info>Loading...</Message>}
      {error && <Message negative>{error}</Message>}
    </div>
  );
};

export default SearchComponent;
