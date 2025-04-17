import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../logo.svg';

function Header() {
    return (
        <header>
            <Container className="header-container">
                <img src={logo} alt="logo" className="logo" />
                <h1>Movie List</h1>
            </Container>
            <Container className="header-container">
                <h3 className='text-secondary'>Rate the movies you watched</h3>
            </Container>
        </header>
    );
}

export default Header;