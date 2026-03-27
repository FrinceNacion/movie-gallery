function Navigation() {
    return (
        <>
            <nav className="d-flex flex-row justify-content-between align-items-center p-3">
                <h3>Movie Gallery</h3>
                <div className="d-flex flex-column justify-content-between d-md-none">
                    <button className="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    ☰
                    </button>
                    <div className="collapse p-2" id="collapseExample">
                        <ul className="d-flex flex-column gap-2"> 
                            <li><p>Gallery</p></li>
                            <li><p>History</p></li>
                            <li><p>Search</p></li>
                        </ul>
                    </div>
                </div>
                <ul className="d-none d-md-flex flex-row justify-content-around align-items-center w-25"> 
                    <li><p>Gallery</p></li>
                    <li><p>History</p></li>
                    <li><p>Search</p></li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;