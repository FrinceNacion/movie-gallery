import "./index.css"

function Footer(){
    return (
        <footer className="footer d-flex flex-column p-3 border-top border-dark-subtle">
            <div className="d-flex flex-row justify-content-evenly flex-wrap">
                <div className="d-flex flex-column w-25 g-3">
                    <p className="footer-header">Note:</p>
                    <p>This project is for education purposes only. <span className="d-none d-sm-block">It aggregates streaming links from various sites already available on the internet but does not host or provide the actual video content.</span> </p>
                </div>
                <div className="d-flex flex-column g-3 d-none d-sm-flex">
                    <p className="footer-header">Tools:</p>
                    <ul>
                        <li>React</li>
                        <li>PHP</li>
                        <li>Bootstrap</li>
                    </ul>
                </div>
                <div className="d-flex flex-column g-3 w-30">
                    <p className="footer-header">Me:</p>
                    <a style={{ textDecoration: 'none' }} href="https://github.com/FrinceNacion" target="_blank" rel="noopener noreferrer">Github</a>
                    <a style={{ textDecoration: 'none' }} href="https://www.facebook.com/frince.lacyy" target="_blank" rel="noopener noreferrer">Facebook</a>
                </div>
            </div>
            <div className="d-flex justify-content-center border-top border-secondary mt-2 p-2">
                <p>Created with love by frincefriess 🍟</p>
            </div>
        </footer>
    )
}

export default Footer;