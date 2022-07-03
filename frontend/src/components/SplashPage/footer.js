import './SplashPage.css'
import { useState } from 'react';

const Footer = () => {
    const [ showAboutLinks, setShowAboutLinks ] = useState(false);

    return (
        <footer>
            <div className="copyright">
              <p className="copyright-paragraph">Copyright @ Christine Zhang</p>
              <div className="about-btn-container">
                <button className="about-btn" onClick={() => setShowAboutLinks(!showAboutLinks)}>About</button>
                <div>
                  {showAboutLinks && (
                    <ul className="about-links-container">
                      <li>
                        <a className="about-links" href="https://github.com/tinezh94" target="_blank">
                          <i className="fa-brands fa-github"></i>
                        </a>
                      </li>
                      <li>
                        <a className="about-links" href="https://www.linkedin.com/in/christine-zhang-4b263080/" target="_blank">
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  )}
                </div>

              </div>
            </div>
          </footer>
    )
};

export default Footer;
