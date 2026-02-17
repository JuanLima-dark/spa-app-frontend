import React from 'react';
import './Footer.css';
import { socialLinks } from '../../data/sociallinks';

function Footer() {
  return (
    <footer>
      <div className="social-icons">
        {socialLinks.map((social, index) => (
          <a 
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="50" 
              height="50" 
              fill={social.color} 
              className={social.className}
              viewBox="0 0 16 16"
            >
              <path d={social.iconPath} />
            </svg>
          </a>
        ))}
      </div>
      
      <p className="footer-text">
        © 2025 XIRUSTORE - Todos los derechos reservados
      </p>
    </footer>
  );
}

export default Footer;