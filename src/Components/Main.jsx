import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, NavDropdown, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchAnime from '../Data/Api';
import './Main.css';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

function Main() {
    return (
        <main>
            <Form className="d-flex col-md-4 mx-auto">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-primary">Search</Button>
            </Form>
            <Card className="movie-list bg-black text-white mt-4 col-md-10 mx-auto">
                <Card.Header></Card.Header>
                <Card.Body>
                    <AnimeList />
                </Card.Body>
            </Card>
        </main>
    );
}

function AnimeList() {
    const [animeArray, setAnimeArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedScores, setSelectedScores] = useState({}); // State to track selected scores

    useEffect(() => {
        async function fetchData() {
            const data = await FetchAnime();
            const updatedData = await Promise.all(
                data.map(async (anime) => {
                    const response = await fetch(anime.relationships.genres.links.related);
                    const genreData = await response.json();
                    const genres = genreData.data.map((genre) => genre.attributes.name);
                    return { ...anime, genres };
                })
            );
            setAnimeArray(updatedData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleScoreSelect = (animeId, score) => {
        setSelectedScores((prevScores) => ({
            ...prevScores,
            [animeId]: score,
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            {animeArray.map((anime) => (
                <Row key={anime.id} className="anime-card-container mb-4">
                    <div className="anime-card">
                        <div className="anime-card-image">
                            <img src={anime.attributes.posterImage.small} alt={anime.attributes.canonicalTitle} height="120px" />
                        </div>
                        <div className="anime-card-title">
                            <div>
                                <a href="" className="text-white">
                                    <h5>{anime.attributes.canonicalTitle}</h5>
                                </a>
                            </div>
                            <div>
                                {anime.genres.map((genre, index) => (
                                    <span key={genre}>
                                        {genre}
                                        {index < anime.genres.length - 1 && ', '}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="anime-card-description">
                            {anime.attributes.description.length > 150
                                ? `${anime.attributes.description.substring(0, 150)}...`
                                : anime.attributes.description}
                        </div>
                        <div className="anime-card-score">
                            <div>
                                <h6>Score: {Math.floor(anime.attributes.averageRating / 10)}</h6>
                            </div>
                            <div>
                                <h6>Your score: </h6>
                                <NavDropdown
                                    style={{ paddingLeft: 5 }}
                                    title={selectedScores[anime.id] || 'Select'}
                                    id={`dropdown-${anime.id}`}
                                    size="sm"
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                        <NavDropdown.Item
                                            onClick={() => handleScoreSelect(anime.id, num)}
                                            key={num}
                                            eventKey={num}
                                        >
                                            {num}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </div>
                        </div>
                    </div>
                </Row>
            ))}
        </Container>
    );
}

export default Main;