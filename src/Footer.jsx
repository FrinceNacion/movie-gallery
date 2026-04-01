import "./index.css"

function Footer(){
    return (
        <footer className="footer d-flex flex-row justify-content-evenly p-3 flex-wrap">
            <div className="d-flex flex-column w-25 g-3">
                <p>Note:</p>
                <p>This project is for education purposes only. <span className="d-none d-sm-block">It aggregates streaming links from various sites already available on the internet but does not host or provide the actual video content.</span> </p>
            </div>
            <div className="d-flex flex-column g-3 d-none d-sm-flex">
                <p>Tools:</p>
                <ul>
                    <li>React</li>
                    <li>PHP</li>
                    <li>Bootstrap</li>
                </ul>
            </div>
            <div className="d-flex flex-column g-3 w-30">
                <p>Me: </p>
                <a style={{ textDecoration: 'none' }} href="https://github.com/FrinceNacion" target="_blank" rel="noopener noreferrer">Github</a>
                <p>Created with love by frincefriess 🍟</p>
            </div>
        </footer>
    )
}

export default Footer;