import { Container, NavDropdown, Row, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Main.css';
import { use, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function Main() {
    return (
        <main>
            <Card className="movie-list bg-black text-white mt-4 col-md-10 mx-auto">
                <Card.Header>
                </Card.Header>
                <Card.Body>
                    <MainContent />
                </Card.Body>
            </Card>
        </main>
    );
}


function AddButton() {
    return (
        <Button variant="outline-primary" className="add-button">
            Add Movie
        </Button>
    );
}

function AddForm() {
    return (
        <Form className="add-form">
            <Form.Group controlId="formMovieName">
                <Form.Label>Movie Name</Form.Label>
                <Form.Control type="text" placeholder="Enter movie name" />
            </Form.Group>
            <Form.Group controlId="formMovieGenre">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" placeholder="Enter genre" />
            </Form.Group>
            <Form.Group controlId="formMovieDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Movie
            </Button>
        </Form>
    );
}

function MainContent() {
    const [fileLoaded, setFileLoaded] = useState(false);
    const [data, setData] = useState(null);

    const handleFileLoad = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const parsedData = JSON.parse(e.target.result).data;
                setData(parsedData);
                setFileLoaded(true);
            };
            reader.readAsText(file);
        }
    };

    if (!fileLoaded) {
        return (
            <>
                <div className="file-loader">
                    <input type="file" accept=".json" onChange={handleFileLoad} />
                </div>
                <div className="alert alert-primary mt-2" role="alert">
                    <h2>Please load a file first.</h2>
                </div>
            </>
        );
    }

    return (
        <AnimeList data={data} setData={setData} />
    );
}

function AnimeCard({ anime, setAnimeList }) {
    const [deleted, setDeleted] = useState(false);
    const handleDelete = () => {
        setDeleted(true);
    }
    if (deleted) {
        setAnimeList((prevList) => {
            const list = prevList.filter((a) => a.id !== anime.id);
            return list;
        });
        return null; 
    }
    return (
        <Row key={anime.id} className="anime-card-container mb-4">
            <div className="anime-card">
                <div className="anime-card-image">
                    <img src={anime.image} alt={anime.title} height="120px" />
                </div>
                <div className="anime-card-title">
                    <div>
                        <a href="" className="text-white">
                            <h5>{anime.title}</h5>
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
                    {anime.description.length > 150
                        ? `${anime.description.substring(0, 150)}...`
                        : anime.description}
                </div>
                <div className="anime-card-score">
                    <div>
                        <h6>Score: {anime.rating}/10</h6>
                    </div>
                </div>
                <div className="anime-card-controls">
                    <Button variant="outline-primary"><FontAwesomeIcon icon={faPen} /></Button>
                    <Button variant="outline-primary" className='mt-2' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
            </div>
        </Row>
    );
}

function AnimeList({ data, setData }) {
    return (
        <Container>
            {data.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} setAnimeList={setData} />
            ))}
        </Container>
    );
}

export default Main;