import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({ searchQuery, setSearchQuery }) {
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    return (
        <Form className="d-flex col-md-4 mx-auto mt-2">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
                value={searchQuery}
            />
        </Form>
    );
}

export default SearchBar;