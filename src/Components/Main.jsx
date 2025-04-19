import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Main.css';
import {useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import AnimeList from './AnimeList';
import SearchBar from './SearchBar';
import { AddButton, AddAnimeForm } from './AddAnimeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpAZ, faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [data, setData] = useState(null);
    const [sort, setSort] = useState(0); // 0: default, 1: ascending, 2: descending

    return (
        <main>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Card className="movie-list bg-black text-white mt-4 col-md-10 mx-auto">
                <Card.Header>
                    {showAddForm ? null : (
                        <>
                            <AddButton setShowAddForm={setShowAddForm} />
                            <Button variant="primary" className="ms-2" onClick={() => setSort(sort === 0 ? 1 : 0)}>
                                <FontAwesomeIcon icon={faArrowDownAZ}></FontAwesomeIcon> Sort
                            </Button>
                            <Button variant="primary" className="ms-2" onClick={() => setSort(sort === 0 ? 2 : 0)}>
                                <FontAwesomeIcon icon={faArrowUpAZ}></FontAwesomeIcon> Sort
                            </Button>
                        </>
                    )}
                </Card.Header>
                <Card.Body>
                    {showAddForm ? (
                        <AddAnimeForm setShowAddForm={setShowAddForm} setData={setData} />
                    ) : (
                        <MainContent searchQuery={searchQuery} data={data} setData={setData} sort={sort} />
                    )}
                </Card.Body>
            </Card>
        </main>
    );
}

function MainContent({ data, setData, searchQuery, sort }) {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data) {
            const filteredData = data.filter((anime) => {
                return searchQuery === '' ? true : anime.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
            if (sort === 1) {
                filteredData.sort((a, b) => {
                    return a.rating < b.rating ? 1 : -1;
                });
            } else if (sort === 2) {
                filteredData.sort((a, b) => {
                    return a.rating > b.rating ? 1 : -1;
                });
            }
            setFilteredData(filteredData);
        }
    }, [searchQuery, data, sort]);

    const handleFileLoad = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const parsedData = JSON.parse(e.target.result).data;
                setData(parsedData);
                // setFileLoaded(true);
            };
            reader.readAsText(file);
        }
    };

    if (!data) {
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
        <AnimeList data={filteredData} setData={setData} />
    );
}

export default Main;