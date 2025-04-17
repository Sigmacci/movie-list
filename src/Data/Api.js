async function FetchAnime() {
    const data = await fetch('https://kitsu.io/api/edge/anime');
    try {
        const response = await data.json();
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default FetchAnime;