import { useState, useEffect } from "react";
import "./index.css";

function MovieCard({ movie }) {
    if (!movie) {
        return (
            <div className="movie-card d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    const [isSaved, setIsSaved] = useState(() => {
        try {
            const saved = localStorage.getItem("watchlist_movies");
            if (!saved) return false;
            const savedList = JSON.parse(saved);
            const movieKey = movie.imdb_id || movie.tmdb_id;
            return savedList.some(m => (m.imdb_id || m.tmdb_id) === movieKey);
        } catch (e) {
            console.error("Error reading from localStorage", e);
            return false;
        }
    });

    const toggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const saved = localStorage.getItem("watchlist_movies");
            const savedList = saved ? JSON.parse(saved) : [];
            const movieKey = movie.imdb_id || movie.tmdb_id;

            let updatedList;
            if (isSaved) {
                updatedList = savedList.filter(m => (m.imdb_id || m.tmdb_id) !== movieKey);
            } else {
                // Save the whole movie details so it can be rendered anywhere
                updatedList = [...savedList, movie];
            }

            localStorage.setItem("watchlist_movies", JSON.stringify(updatedList));
            setIsSaved(!isSaved);
        } catch (e) {
            console.error("Error writing to localStorage", e);
        }
    };

    // Stateful Modal logic
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openSimilarModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const closeSimilarModal = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsModalOpen(false);
    };

    // Fetch similar movies when modal is opened
    useEffect(() => {
        if (!isModalOpen) return;

        const fetchSimilar = async () => {
            setLoading(true);
            setError(null);
            try {
                const movieKey = movie.imdb_id || movie.tmdb_id;
                // Fetching similar movies from PHP backend aggregation
                const res = await fetch(`https://mg-api.ddev.site/endpoints/get_similar_movies.php?id=${movieKey}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                if (data.success && data.movies && data.movies.results) {
                    setSimilarMovies(data.movies.results);
                } else {
                    setSimilarMovies([]);
                }
            } catch (err) {
                console.error("Error fetching similar movies:", err);
                setError("Could not load similar movies at this time.");
            } finally {
                setLoading(false);
            }
        };

        fetchSimilar();
    }, [isModalOpen, movie]);

    // Handle escape key to close modal
    useEffect(() => {
        if (!isModalOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeSimilarModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    const rating = movie.vote_average ? Number(movie.vote_average) : 0;
    const year = movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : "");
    const mainGenre = movie.genres && movie.genres.length > 0 ? movie.genres[0] : "";

    return (
        <>
            <div className="movie-card">
                {/* Image & Rating Badge */}
                <div className="movie-poster-wrapper">
                    <img
                        className="movie-poster-img"
                        src={movie.poster}
                        alt={movie.title}
                        loading="lazy"
                    />
                    {rating > 0 && (
                        <div className="movie-rating-badge">
                            <span className="movie-rating-star">★</span>
                            <span>{rating.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                {/* Content body */}
                <div className="movie-card-content">
                    <div className="movie-card-meta">
                        {year && <span className="movie-card-year">{year}</span>}
                        {mainGenre && <span className="movie-card-genres" title={movie.genres.join(", ")}>{mainGenre}</span>}
                    </div>
                    <h4 className="movie-card-title" title={movie.title}>
                        {movie.title}
                    </h4>
                </div>

                {/* Action Buttons at Bottom */}
                <div className="movie-card-actions">
                    <button
                        className={`btn-card-action ${isSaved ? "saved" : ""}`}
                        onClick={toggleSave}
                        title={isSaved ? "Remove from Watchlist" : "Save to Watchlist"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                    <button
                        className="btn-card-action"
                        onClick={openSimilarModal}
                        title="Show Similar Movies"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                        <span>Similar</span>
                    </button>
                </div>
            </div>

            {/* Similar Movies Modal Overlay */}
            {isModalOpen && (
                <div className="similar-modal-overlay" onClick={closeSimilarModal}>
                    <div className="similar-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div className="similar-modal-header">
                            <h3 className="similar-modal-title">
                                Movies Similar to <span style={{ color: "var(--accent)" }}>{movie.title}</span>
                            </h3>
                            <button className="btn-modal-close" onClick={closeSimilarModal} aria-label="Close modal">
                                &times;
                            </button>
                        </div>

                        {/* Body */}
                        <div className="similar-modal-body">
                            {loading ? (
                                <div className="modal-loader">
                                    <div className="spinner-icon"></div>
                                    <p className="p-subtle">Aggregating related suggestions...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-5 text-danger">
                                    <p>{error}</p>
                                </div>
                            ) : similarMovies.length === 0 ? (
                                <div className="text-center py-5">
                                    <p className="p-subtle">No similar movies found for this title.</p>
                                </div>
                            ) : (
                                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
                                    {similarMovies.slice(0, 8).map((simMovie, i) => {
                                        const simRating = simMovie.vote_average ? Number(simMovie.vote_average) : 0;
                                        const simYear = simMovie.year || (simMovie.release_date ? new Date(simMovie.release_date).getFullYear() : "");
                                        const simMainGenre = simMovie.genres && simMovie.genres.length > 0 ? simMovie.genres[0] : "";

                                        return (
                                            <div key={i} className="col d-flex justify-content-center">
                                                <div className="movie-card w-100" style={{ transform: "none" }}>
                                                    <div className="movie-poster-wrapper">
                                                        <img
                                                            className="movie-poster-img"
                                                            src={simMovie.poster}
                                                            alt={simMovie.title}
                                                        />
                                                        {simRating > 0 && (
                                                            <div className="movie-rating-badge">
                                                                <span className="movie-rating-star">★</span>
                                                                <span>{simRating.toFixed(1)}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="movie-card-content">
                                                        <div className="movie-card-meta">
                                                            {simYear && <span className="movie-card-year">{simYear}</span>}
                                                            {simMainGenre && <span className="movie-card-genres">{simMainGenre}</span>}
                                                        </div>
                                                        <h5 className="movie-card-title text-truncate" title={simMovie.title} style={{ height: "auto", marginBottom: "4px" }}>
                                                            {simMovie.title}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MovieCard;