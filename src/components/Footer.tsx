import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="gsn-footer" role="contentinfo">
      <div className="gsn-container">
        <div className="gsn-footer__top">

          {/* Brand Column */}
          <div className="gsn-footer__brand">
            <div className="gsn-footer__brand-logo">
              <div className="gsn-footer__logo-icon" aria-hidden="true">
                <img src="/logo.png" alt="GovNavigator Logo" />
              </div>
              <span className="gsn-footer__logo-name">Gov<span>Navigator</span></span>
            </div>
            <p>Your one-stop portal for discovering, understanding, and accessing government services online — fast and hassle-free.</p>
          </div>

          {/* Services Column */}
          <div className="gsn-footer__col">
            <h4>Services</h4>
            <ul>
              <li><a href="/#categories">All Categories</a></li>
              <li><Link to="/services">Browse Services</Link></li>
              <li><a href="/#how-it-works">How It Works</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Departments Column */}
          <div className="gsn-footer__col">
            <h4>Departments</h4>
            <ul>
              <li><Link to="/services?cat=health">Health &amp; Medical</Link></li>
              <li><Link to="/services?cat=education">Education</Link></li>
              <li><Link to="/services?cat=transport">Transport</Link></li>
              <li><Link to="/services?cat=legal">Legal &amp; Justice</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="gsn-footer__col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><a href="/#contact">Contact Us</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="gsn-footer__bottom">
          <p className="gsn-footer__copy">© {new Date().getFullYear()} GovNavigator. All rights reserved.</p>
          <p className="gsn-footer__disclaimer">
            Informational portal only. For official transactions, always use verified government websites.
          </p>
        </div>
      </div>
    </footer>
  );
}
