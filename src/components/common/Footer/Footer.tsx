import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <a
        href="https://github.com/elaineir"
        target="_blank"
        rel="noopener noreferrer"
        className="footer__link"
      >
        &copy;{currentYear} elaineir
      </a>
    </footer>
  );
}

export default Footer;
