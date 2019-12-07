import React from "react";
import styles from './FooterStyles.css';
import { GithubIcon } from './Icons'

const Footer = () => {

    function getYear() {
        return new Date().getFullYear();
    }

    // Contains zero styling - pure HTML (react)
    return (
        <footer className='footer'>
            <div className="footer__content">
                <div className="content__column content__column--left">
                    <h4 className="column__title">Hold Krykke</h4>
                    <p className="column__list-item">AP Computer Science</p>
                    <p className="column__list-item">3. Semester Exam Project</p>
                    <p className="column__list-item">CPH Business, Lyngby Denmark</p>
                </div>
                <div className="content__column content__column--right">
                    <ul className="column__list">
                        <li className="column__list-item_right mb-2">
                            <a href="#/about">About & Credits</a>
                        </li>
                        <li className="column__list-item">
                            <a href="https://www.github.com/Hold-Krykke" className="column__link"><span className="mr-1">Project Repository</span> <GithubIcon /></a>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="footer__copyright">Copyright {getYear()}. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
