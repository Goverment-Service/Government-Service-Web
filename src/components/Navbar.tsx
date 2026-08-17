import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`gsn-nav${scrolled ? ' gsn-nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="gsn-nav__inner">
          {/* Brand */}
          <Link to="/" className="gsn-nav__brand" aria-label="GovNavigator home">
            <div className="gsn-nav__logo" aria-hidden="true">
              <img src="/logo.png" alt="GovNavigator Logo" />
            </div>
            <span className="gsn-nav__brand-name">Gov<span>Navigator</span></span>
          </Link>

          {/* Desktop Links */}
          <ul className="gsn-nav__links" role="list">
            <li><Link to="/" className={`gsn-nav__link${isActive('/') ? ' gsn-nav__link--active' : ''}`}>Home</Link></li>
            <li><a href="/#categories" className="gsn-nav__link">Categories</a></li>
            <li><Link to="/services" className={`gsn-nav__link${isActive('/services') ? ' gsn-nav__link--active' : ''}`}>All Services</Link></li>
            <li><a href="/#how-it-works" className="gsn-nav__link">How It Works</a></li>
            <li><Link to="/about" className={`gsn-nav__link${isActive('/about') ? ' gsn-nav__link--active' : ''}`}>About</Link></li>
          </ul>

          {/* Right Actions */}
          <div className="gsn-nav__actions">
            <div className="gsn-nav__divider" aria-hidden="true" />
            <Link to="/services" className="gsn-btn gsn-btn--primary">Find a Service</Link>
            <button
              className="gsn-nav__toggle"
              id="nav-toggle"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="nav-mobile"
              onClick={() => setMobileOpen(o => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`gsn-nav__mobile${mobileOpen ? ' is-open' : ''}`}
        id="nav-mobile"
        role="dialog"
        aria-label="Navigation menu"
        onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
      >
        <div className="gsn-nav__drawer">
          <Link to="/" className="gsn-nav__drawer-link">Home</Link>
          <a href="/#categories" className="gsn-nav__drawer-link">Categories</a>
          <Link to="/services" className="gsn-nav__drawer-link">All Services</Link>
          <a href="/#how-it-works" className="gsn-nav__drawer-link">How It Works</a>
          <Link to="/about" className="gsn-nav__drawer-link">About</Link>
          <div className="gsn-nav__drawer-cta">
            <Link to="/services" className="gsn-btn gsn-btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
              Find a Service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
