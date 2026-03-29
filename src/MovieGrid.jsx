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
        <div className="container m-0 d-grid"
        style={{
          gridTemplateColumns: "repeat(5, 17%)",
          gridTemplateRows: "repeat(3, 25%)",
          columnGap: "3%",
          rowGap: "3%",
        }}>
            {movies.length > 0 ? (
                movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie}/>
                ))
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
}

export default MovieGrid;