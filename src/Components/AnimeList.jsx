import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Button, FormSelect } from 'react-bootstrap';
import { useState } from 'react';
import '../Styles/AnimeList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AnimeCard({ anime, setAnimeList }) {
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

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
                    <img src={anime.image} alt={anime.title} className='mx-auto' height="120px" />
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
                        <h6>Score: {edited ?  
                                    <FormSelect 
                                        aria-label="Select rating" 
                                        defaultValue={anime.rating} 
                                        onChange={(e) => {
                                            setAnimeList((prevList) => {
                                                const list = prevList.map((a) => {
                                                    if (a.id === anime.id) {
                                                        return { ...a, rating: e.target.value };
                                                    }
                                                    return a;
                                                });
                                                return list;
                                            });
                                    }}>
                                        {
                                            [...Array(10)].map((_, index) => index + 1).map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))
                                        }
                                    </FormSelect> : `${anime.rating}/10`
                                }
                        </h6>
                    </div>
                </div>
                <div className="anime-card-controls">
                    {
                        edited ? (
                            <Button variant="outline-primary" onClick={() => setEdited(false)}><FontAwesomeIcon icon={faFloppyDisk} /></Button>
                        ) : (
                            <Button variant="outline-primary" onClick={() => setEdited(true)}><FontAwesomeIcon icon={faPen} /></Button>
                        )
                    }
                    <Button variant="outline-primary" className='mt-2' onClick={() => setDeleted(true)}><FontAwesomeIcon icon={faTrash} /></Button>
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


export default AnimeList;