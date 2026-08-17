import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gsn-reveal--visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="gsn-reveal" style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const TEAM = [
  { name: 'Sarah Mitchell', role: 'Director of Digital Services', initials: 'SM', color: '#1a56db' },
  { name: 'James Okafor', role: 'Head of Technology', initials: 'JO', color: '#059669' },
  { name: 'Priya Ramachandran', role: 'UX & Accessibility Lead', initials: 'PR', color: '#8b5cf6' },
  { name: 'David Chen', role: 'Security & Compliance', initials: 'DC', color: '#ef4444' },
];

const VALUES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Secure by Design',
    desc: 'Every interaction on GovNavigator is protected by government-grade encryption and strict data minimisation principles.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Inclusive Access',
    desc: 'Built to WCAG 2.1 AA standards, available in multiple languages, and optimised for low-bandwidth connections.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Always Improving',
    desc: 'Continuous user research and data-driven iteration ensure GovNavigator keeps getting better with every release.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'People First',
    desc: 'Every design decision starts with the citizen. We obsess over reducing friction and bureaucratic complexity.',
  },
];

export default function About() {
  return (
    <main id="main-content">

      {/* ── Page Header ── */}
      <div className="gsn-page-header">
        <div className="gsn-container">
          <span className="gsn-eyebrow">About Us</span>
          <h1 className="gsn-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>
            Making government services accessible to everyone
          </h1>
          <p className="gsn-lead">
            GovNavigator is a government-funded digital services platform designed to simplify
            how citizens discover, understand, and access public services — online, anytime.
          </p>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="gsn-section">
        <div className="gsn-container">
          <div className="about-mission-grid">
            <RevealItem>
              <div className="about-mission-text">
                <span className="gsn-eyebrow">Our Mission</span>
                <h2 className="gsn-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: '0.75rem 0 1rem' }}>
                  A single front door to every government service
                </h2>
                <p style={{ color: 'var(--gsn-text-muted)', lineHeight: '1.75', marginBottom: '1rem' }}>
                  Navigating government bureaucracy has historically required citizens to know exactly which department
                  handles their request, visit multiple websites, and repeat the same information over and over.
                  GovNavigator changes that.
                </p>
                <p style={{ color: 'var(--gsn-text-muted)', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                  We aggregate over 250 government services across 32 departments into a single, searchable portal —
                  so citizens spend less time navigating bureaucracy and more time on what matters to them.
                </p>
                <Link to="/services" className="gsn-btn gsn-btn--primary">
                  Explore Services
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </RevealItem>
            <RevealItem delay={0.1}>
              <div className="about-stats-panel">
                {[
                  { value: '250+', label: 'Services available' },
                  { value: '32', label: 'Government departments' },
                  { value: '1.2M+', label: 'Citizens served' },
                  { value: '99.9%', label: 'Uptime SLA' },
                ].map((stat, i) => (
                  <div key={i} className="about-stat">
                    <span className="about-stat-value">{stat.value}</span>
                    <span className="about-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="gsn-section gsn-section--alt">
        <div className="gsn-container">
          <RevealItem>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="gsn-eyebrow" style={{ justifyContent: 'center' }}>Our Values</span>
              <h2 className="gsn-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: '0.5rem' }}>
                Principles that guide everything we build
              </h2>
            </div>
          </RevealItem>
          <div className="gsn-grid gsn-grid--2">
            {VALUES.map((val, i) => (
              <RevealItem key={val.title} delay={i * 0.08}>
                <div className="gsn-card about-value-card">
                  <div className="about-value-icon">{val.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{val.title}</h3>
                  <p style={{ color: 'var(--gsn-text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{val.desc}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="gsn-section">
        <div className="gsn-container">
          <RevealItem>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="gsn-eyebrow" style={{ justifyContent: 'center' }}>The Team</span>
              <h2 className="gsn-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginTop: '0.5rem' }}>
                The people behind GovNavigator
              </h2>
            </div>
          </RevealItem>
          <div className="gsn-grid gsn-grid--4">
            {TEAM.map((member, i) => (
              <RevealItem key={member.name} delay={i * 0.08}>
                <div className="gsn-card about-team-card">
                  <div className="about-team-avatar" style={{ background: member.color }}>
                    {member.initials}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--gsn-text-muted)', fontSize: '0.875rem' }}>{member.role}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gsn-section gsn-section--cta" aria-labelledby="about-cta-heading">
        <div className="gsn-container">
          <RevealItem>
            <div className="cta-box">
              <span className="gsn-eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>Get Started</span>
              <h2 className="gsn-heading cta-title" id="about-cta-heading">
                Ready to find your service?
              </h2>
              <p className="cta-desc">
                Search across all departments and get guided step-by-step through any government service.
              </p>
              <div className="cta-actions">
                <Link to="/services" className="gsn-btn gsn-btn--white">
                  Browse Services
                </Link>
                <a href="/#contact" className="gsn-btn gsn-btn--outline-white">
                  Contact Support
                </a>
              </div>
            </div>
          </RevealItem>
        </div>
      </section>
    </main>
  );
}
