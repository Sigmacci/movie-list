import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../logo.svg';

function Header() {
    return (
        <header>
            <Container className="header-container">
                <img src={logo} alt="logo" className="logo" />
                <h1>Anime List</h1>
            </Container>
            <Container className="header-container">
                <h3 className='text-secondary'>Add and rate the anime you watched</h3>
            </Container>
            <SearchBar />
        </header>
    );
}

function SearchBar() {
    return (
        <Form className="d-flex col-md-4 mx-auto mt-2">
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
        </Form>
    );
}

export default Header;