import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import { CATEGORIES } from '../data/categories';
import { SERVICES } from '../data/services';
import heroImg from '../assets/hero.png';

const STEPS = [
  {
    number: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Search for a Service',
    desc: 'Use the search bar or browse categories to find the exact government service you need — filtered by department or availability.',
  },
  {
    number: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Review Requirements',
    desc: 'Each service page lists required documents, eligibility criteria, fees, and estimated processing time before you commit to applying.',
  },
  {
    number: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22,4 12,14.01 9,11.01" />
      </svg>
    ),
    title: 'Apply Online',
    desc: 'Complete your application digitally, upload documents, pay fees securely, and receive real-time status updates on your submission.',
  },
];
const FAQS = [
  {
    q: 'Do I need an account to access government services?',
    a: 'Some services can be accessed without an account. However, for personalised services, application tracking, and pre-filled forms, we recommend creating a free account using your National ID.',
  },
  {
    q: 'Are all services available online?',
    a: 'Most services are fully online. Services marked "Partially Online" or "In Person Only" may still require a physical visit for biometric collection or document verification.',
  },
  {
    q: 'How long does it take to process my application?',
    a: "The time shown on each card is the online application time, not the department's processing time. Depending on the service, processing after submission may take 3–30 working days.",
  },
  {
    q: 'What documents do I typically need?',
    a: 'Common documents include your National ID, birth certificate, and proof of address. Each service page lists exact requirements before you begin the application.',
  },
  {
    q: 'Is this portal secure?',
    a: 'GovNavigator uses end-to-end encryption and TLS 1.3 for all data transmissions. We follow government-grade security standards and do not store personal data beyond what is required.',
  },
];


function useReveal() {
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
  return ref;
}


function RevealDiv({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`gsn-reveal${className ? ' ' + className : ''}`} style={style}>
      {children}
    </div>
  );
}


export default function Home() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const servicesRef = useRef<HTMLElement>(null);

  const filteredServices = useCallback(() => {
    let services = SERVICES;
    if (activeFilter !== 'all') {
      services = services.filter(s => s.category === activeFilter);
    } else if (!query.trim()) {
      services = services.filter(s => s.featured);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      services = services.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q)
      );
    }
    return services;
  }, [query, activeFilter]);

  const handleSearch = () => {
    if (query.trim()) {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (id: string) => {
    setActiveFilter(id);
    setQuery('');
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleTagClick = (tag: string) => {
    const keyword = tag.replace(/\p{Emoji}/gu, '').trim().toLowerCase();
    setQuery(keyword);
    setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };



  return (
    <main id="main-content">

      {/* ── HERO ── */}
      <header className="hero" id="home">
        <div className="gsn-container">
          <div className="hero-content">
            <span className="gsn-eyebrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              Official Government Services Portal
            </span>

            <h1 className="hero-title">
              Find Government Services<br />
              <span className="hero-title-accent">Fast &amp; Easy</span>
            </h1>

            <p className="hero-lead">
              One portal for every public service. Search across departments, discover eligibility,
              and get step-by-step guidance to apply — all online.
            </p>

            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

            <div className="hero-tags" role="list" aria-label="Quick service topics">
              {['🏥 Health', '🎓 Education', '🚌 Transport', '⚖️ Legal', '💰 Tax', '🏢 Business'].map(tag => (
                <span
                  key={tag}
                  className="hero-tag"
                  role="listitem"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual / stats panel */}
          <div className="hero-visual">
            <RevealDiv className="hero-stat-card">
              <div className="hero-stat-inner">
                <div className="hero-stat-item">
                  <span className="hero-stat-value">250+</span>
                  <span className="hero-stat-label">Services</span>
                </div>
                <div className="hero-stat-divider" aria-hidden="true" />
                <div className="hero-stat-item">
                  <span className="hero-stat-value">32</span>
                  <span className="hero-stat-label">Departments</span>
                </div>
                <div className="hero-stat-divider" aria-hidden="true" />
                <div className="hero-stat-item">
                  <span className="hero-stat-value">8</span>
                  <span className="hero-stat-label">Categories</span>
                </div>
              </div>
            </RevealDiv>
            <img
              src={heroImg}
              alt="Illustration of a government services portal with digital documents and a city hall"
              className="hero-img gsn-reveal gsn-reveal--visible"
              width="1200"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </header>

      {/* ── CATEGORIES ── */}
      <section className="gsn-section gsn-section--alt" id="categories" aria-labelledby="categories-heading">
        <div className="gsn-container">
          <RevealDiv className="section-intro">
            <span className="gsn-eyebrow">Browse by Category</span>
            <div className="section-intro-grid">
              <h2 className="gsn-heading section-title" id="categories-heading">
                Services for every need
              </h2>
              <p className="section-desc">
                From health to business — explore government services organised by life events
                and departments. Click a category to filter services instantly.
              </p>
            </div>
          </RevealDiv>
          <div className="gsn-grid gsn-grid--4" role="list">
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.id} cat={cat} onSelect={handleCategorySelect} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section className="gsn-section" id="services" ref={servicesRef} aria-labelledby="services-heading">
        <div className="gsn-container">
          <RevealDiv className="section-intro">
            <span className="gsn-eyebrow">Featured Services</span>
            <div className="section-intro-grid">
              <h2 className="gsn-heading section-title" id="services-heading">
                Most accessed services
              </h2>
              <p className="section-desc">
                Frequently used government services, ready to access online with guided
                step-by-step instructions and real-time status tracking.
              </p>
            </div>
          </RevealDiv>

          {/* Category filter bar */}
          <div className="filter-bar" id="filter-bar" role="group" aria-label="Filter services by category">
            <button
              className={`filter-btn${activeFilter === 'all' ? ' filter-btn--active' : ''}`}
              id="filter-all"
              onClick={() => { setActiveFilter('all'); setQuery(''); }}
            >
              All Featured
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`filter-btn${activeFilter === c.id ? ' filter-btn--active' : ''}`}
                id={`filter-${c.id}`}
                onClick={() => { setActiveFilter(c.id); setQuery(''); }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Services grid */}
          {filteredServices().length === 0 ? (
            <div className="services-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gsn-text-faint)', marginBottom: '1rem' }} aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p style={{ fontWeight: 600 }}>No services found.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--gsn-text-faint)' }}>
                Try a different keyword or browse by category.
              </p>
            </div>
          ) : (
            <div className="gsn-grid gsn-grid--3" role="list">
              {filteredServices().map(s => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}

          <RevealDiv className="services-cta">
            <Link to="/services" className="gsn-btn gsn-btn--ghost">
              View All Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="gsn-section gsn-section--alt" id="how-it-works" aria-labelledby="steps-heading">
        <div className="gsn-container">
          <RevealDiv className="section-intro centered">
            <span className="gsn-eyebrow">How It Works</span>
            <h2 className="gsn-heading section-title" id="steps-heading">Three simple steps</h2>
            <p className="section-desc center-text">
              Navigating government services shouldn't be complicated. We've made it simple.
            </p>
          </RevealDiv>
          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <RevealDiv key={step.number} className="step-card" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="step-card__number">{step.number}</div>
                <div className="step-card__icon">{step.icon}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="gsn-section" id="faq" aria-labelledby="faq-heading">
        <div className="gsn-container">
          <div className="faq-layout">
            <RevealDiv className="faq-intro">
              <span className="gsn-eyebrow">FAQ</span>
              <h2 className="gsn-heading faq-title" id="faq-heading">Common questions answered</h2>
              <p className="faq-intro-text">
                Can't find what you need?{' '}
                <a href="#contact">Contact our support team</a> for help navigating services.
              </p>
            </RevealDiv>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <RevealDiv key={i} className="faq-item" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <button
                    className="faq-btn"
                    id={`faq-btn-${i}`}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <svg
                      className={`faq-icon${openFaq === i ? ' faq-icon--open' : ''}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="faq-panel" id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`}>
                      <p className="faq-answer">{faq.a}</p>
                    </div>
                  )}
                </RevealDiv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section className="gsn-section gsn-section--cta" id="contact" aria-labelledby="cta-heading">
        <div className="gsn-container">
          <RevealDiv className="cta-box">
            <span className="gsn-eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>Need Help?</span>
            <h2 className="gsn-heading cta-title" id="cta-heading">
              Can't find the service you need?
            </h2>
            <p className="cta-desc">
              Our support team is available Monday–Friday, 9 am–5 pm to help you navigate
              government services and complete your applications.
            </p>
            <div className="cta-actions">
              <a href="tel:1800-000-000" className="gsn-btn gsn-btn--white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                1800-000-000
              </a>
              <a href="mailto:support@gov.portal" className="gsn-btn gsn-btn--outline-white">
                Email Support
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </main>
  );
}
