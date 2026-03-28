
function MovieCard({movie}) {
    return (
        <div className="w-100 h-100">
            { movie ? (
                <a href="">
                    <img className="img-fluid rounded-2" src={movie.poster} alt={movie.title}/>
                </a>
            ) : (<p>Loading</p>)}
        </div>
    );
}


export default MovieCard;