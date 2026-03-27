import './Navigation.jsx'
import Navigation from './Navigation.jsx'
import MovieGrid from './MovieGrid.jsx'

function App() {

  return (
    <>
      <div className="container d-flex flex-column gap-2">
        <Navigation />
        <h1>Movie Gallery</h1>
        <p>Welcome to the Movie Gallery!</p>
        <MovieGrid />
      </div>
    </>
  )
}

export default App
