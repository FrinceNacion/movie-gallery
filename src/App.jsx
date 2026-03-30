import './Navigation.jsx'
import Navigation from './Navigation.jsx'
import MovieGrid from './MovieGrid.jsx'

function App() {

  return (
    <>
      <div className="container-fluid d-flex flex-column gap-2 h-100">
        <Navigation />
        <MovieGrid />
      </div>
    </>
  )
}

export default App
