import "./index.css";

function MovieCard({movie}) {
    return (
        <div className="movie-card">
            { movie ? (
                <a href="">
                    <img className="img-fluid rounded-top-2" src={movie.poster} alt={movie.title}/>
                </a>
            ) : (<p>Loading</p>)}
            <div className="info-pill d-flex flex-row rounded-bottom-2 w-100 p-1">
                <div className="d-flex flex-row justify-content-around w-100">
                    <p className="p-subtle">save</p>
                    <p className="p-subtle">similar</p>
                </div>
            </div>
        </div>
    );
}


export default MovieCard;