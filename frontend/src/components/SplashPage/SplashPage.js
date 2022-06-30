import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import './SplashPage.css';

const SplashPage = () => {

  const [ showAboutLinks, setShowAboutLinks ] = useState(false);

    return (
        <>
          <h1>Tame Your Work, Organize Your Life</h1>
          <div>
            <p className="description">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</p>
          </div>
          <div className="signup-button-div">
            {/* <SignupFormModal /> */}
            <button className="splash-page-signup-button" href="/signup">
              <NavLink className={"signup-button-primary"} to="/signup">Sign Up For Free</NavLink>
              </button>
          </div>
          <div className="splash-page-body-content">
            <img className="splash-page-image" src="https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?b5afe30ef59efef5" alt="laptop" />
            <div className="splash-page-body-texts">
              <h3>Work Anywhere</h3>
              <p className="splash-page-body-text-p">Keep important info handy - your notes sync automatically to all your devices.</p>
              <h3>Remember Everything</h3>
              <p className="splash-page-body-text-p">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
              <h3>Turn To-do Info Done</h3>
              <p className="splash-page-body-text-p">Bring your notes, tasks, and schedules together to get things done more easily.</p>
              <h3>Find Things Fast</h3>
              <p className="splash-page-body-text-p">Get what you need, when you need it with powerful, flexible search capabilities.</p>
            </div>
          </div>
          <footer>
            <div className="copyright">
              <p className="copyright-paragraph">Copyright @ Christine Zhang</p>
              <div className="about-btn-container">
                <button className="about-btn" onClick={() => setShowAboutLinks(!showAboutLinks)}>About</button>
                <div>
                  {showAboutLinks && (
                    <ul className="about-links-container">
                      <li>
                        <a className="about-links" href="https://github.com/tinezh94">
                          <i className="fa-brands fa-github"></i>
                        </a>
                      </li>
                      <li>
                        <a className="about-links" href="https://www.linkedin.com/in/christine-zhang-4b263080/">
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  )}
                </div>

              </div>
            </div>
          </footer>
        </>
    )
}

export default SplashPage;
