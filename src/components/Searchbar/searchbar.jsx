import { Search, SearchBtn, Form, Field, FormLabel } from "./searchbar.styled";
import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangeSearchQuery = (e) => {
        setSearchQuery( e.currentTarget.value.toLowerCase());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
        return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
    }

    return (
        <Search>
        <Form onSubmit={handleSubmit}>
            <Field name="query"
                type="text"
                autoComplete="off"
                autoFocus
                value={searchQuery}
                onChange={handleChangeSearchQuery}
                placeholder="Search images and photos" />
            <SearchBtn type="submit"><FormLabel>Search</FormLabel></SearchBtn>
        </Form>
    </Search>

    )
}