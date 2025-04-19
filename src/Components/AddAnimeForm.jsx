import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddButton({ setShowAddForm }) {
    return (
        <Button variant="primary" className="add-button" onClick={() => setShowAddForm(true)}>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Anime
        </Button>
    );
}

function AddAnimeForm({ setData, setShowAddForm }) {
    const submitAnime = () => {
        const movieName = document.getElementById('formMovieName').value;
        const movieImage = document.getElementById('formMovieImage').value;
        const movieGenres = document.getElementById('formMovieGenres').value.split(', ');
        const movieDescription = document.getElementById('formMovieDescription').value;
        const movieRating = document.getElementById('formMovieRating').value;

        const newAnime = {
            id: Math.floor(Math.random() * 10000),
            title: movieName,
            image: movieImage,
            genres: movieGenres,
            description: movieDescription,
            rating: movieRating,
        };

        console.log(newAnime);

        setData((prevData) => {
            console.log([...prevData, newAnime]);
            return [...prevData, newAnime];
        });
        setShowAddForm(false);
    }

    return (
        <Form className="add-form col-md-8 mx-auto">
            <Form.Group controlId="formMovieName">
                <Form.Label>Movie Name</Form.Label>
                <Form.Control type="text" placeholder="Enter movie name" />
            </Form.Group>
            <Form.Group controlId="formMovieImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" />
            </Form.Group>
            <Form.Group controlId="formMovieGenres">
                <Form.Label>Genres</Form.Label>
                <Form.Control type="text" placeholder="Enter genres" />
            </Form.Group>
            <Form.Group controlId="formMovieDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" />
            </Form.Group>
            <Form.Group controlId="formMovieRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" placeholder="Enter rating" min="1" max="10" step="1" />
            </Form.Group>
            <Button variant="primary" onClick={submitAnime}>
                Add Anime
            </Button>
        </Form>
    );
}

export { AddButton, AddAnimeForm };