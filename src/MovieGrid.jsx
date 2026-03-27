import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieGrid() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const fetch_movies = async () => {
            try{
                const res = await fetch("https://mg-api.ddev.site/endpoints/get_trending_movies.php?page=1");
                const data = await res.json();
                console.log(data.success);
                console.log(data.movies.results);
                setMovies(data.movies.results);
            } catch(err){
                console.error(err);
            }
        };

        fetch_movies();
        console.log(movies);
    }, []);

    return(
        <div className="row justify-content-center g-3">
 
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