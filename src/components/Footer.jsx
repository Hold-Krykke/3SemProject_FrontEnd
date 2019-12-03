import React from "react";
import styles from './FooterStyles.css';
import { GithubIcon } from './Icons'

const Footer = () => {
  // Contains zero styling - pure HTML (react)
  return (
    <footer className='footer'>
      <div className="footer__content">
        <div className="content__column content__column--left">
          <h4 className="column__title">Hold Krykke</h4>
          <p className="column__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia efficitur sodales. Donec pharetra augue egestas mattis tristique. Aliquam feugiat libero et lorem suscipit rhoncus. Integer non ipsum. lorem suscipit rhoncus....</p>
        </div>
        <div className="content__column content__column--middle">
          <ul className="column__list">
            <li className="column__list-item">Click a Country</li>
            <li className="column__list-item">Click a City</li>
            <li className="column__list-item">Pick a Date</li>
            <li className="column__list-item">Result</li>
          </ul>
        </div>
        <div className="content__column content__column--right">
          <a href="https://www.github.com/Hold-Krykke" className="column__link"><GithubIcon/></a>
        </div>
      </div>
      <p className="footer__copyright">Copyright 2019. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
