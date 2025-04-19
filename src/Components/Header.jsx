import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Header.css';
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
        </header>
    );
}

export default Header;