import "./index.css"

function Footer(){
    return (
        <footer className="footer d-flex flex-row justify-content-between p-3">
            <div className="d-flex flex-column w-50 justify-content-between g-2">
                <p>This site is a personal project for education purposes only. It aggregates streaming links from various sites already available on the internet but does not host or provide the actual video content.</p>
                <p>Created with love by frincefriess 🍟</p>
            </div>
            <div className="d-flex flex-column justify-content-center g-2">
                <p>Github: <a href="https://github.com/FrinceNacion" target="_blank" rel="noopener noreferrer">FrinceNacion</a></p>
            </div>
        </footer>
    )
}

export default Footer;