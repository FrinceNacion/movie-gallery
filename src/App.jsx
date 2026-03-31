import './Navigation.jsx'
import Navigation from './Navigation.jsx'
import MovieGrid from './MovieGrid.jsx'
import Footer from './Footer.jsx'

function App() {

  return (
    <>
      <div className="container-fluid d-flex flex-column gap-2 h-100 p-0">
        <Navigation />
        <MovieGrid />
        <Footer />
      </div>
    </>
  )
}

export default App
