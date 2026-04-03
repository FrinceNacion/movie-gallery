import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieGrid() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const fetch_movies = async () => {
            try{
                const res = await fetch("https://mg-api.ddev.site/endpoints/get_trending_movies.php?page=1");
                const data = await res.json();
                setMovies(data.movies.results);
            } catch(err){
                console.error(err);
            }
        };

        fetch_movies();
    }, []);

    return(
        <div className="container min-vh-100">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {movies.length > 0 ? (
                movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie}/>
                ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default MovieGrid;