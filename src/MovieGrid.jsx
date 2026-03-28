import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieGrid() {
    const [data, setData] = useState(null);
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const fetch_movies = async () => {
            try{
                const res = await fetch("https://mg-api.ddev.site/endpoints/get_trending_movies.php?page=1");
                const data = await res.json();
                setData(data.movies);
                setMovies(data.movies.results);
            } catch(err){
                console.error(err);
            }
        };

        fetch_movies();
    }, []);

    return(
        <div className="container d-grid">
            {movies.length > 0 ? (
                movies.map((movie, index) => (
                    <p key={index}>{movie.title}</p>
                ))
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
}

export default MovieGrid;