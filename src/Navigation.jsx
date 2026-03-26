function Navigation() {
    return (
        <>
            <nav className="d-flex flex-row justify-content-between align-items-center p-3">
                <h3>Movie Gallery</h3>
                <ul className="d-flex flex-row justify-content-around align-items-center w-25"> 
                    <li><p>Home</p></li>
                    <li><p>History</p></li>
                    <li><p>Search</p></li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;