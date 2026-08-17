import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ServiceCard from '../components/ServiceCard';
import { CATEGORIES } from '../data/categories';
import { SERVICES } from '../data/services';

function useRevealAll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('gsn-reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.gsn-reveal:not(.gsn-reveal--visible)').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

export default function Services() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') ?? 'all';

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialCat);

  useRevealAll();

  const filteredServices = useCallback(() => {
    let services = SERVICES;
    if (activeFilter !== 'all') {
      services = services.filter(s => s.category === activeFilter);
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

  return (
    <main id="main-content">

      {/* ── Page Header ── */}
      <div className="gsn-page-header">
        <div className="gsn-container">
          <span className="gsn-eyebrow">Government Services</span>
          <h1 className="gsn-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
            Browse All Services
          </h1>
          <p className="gsn-lead" style={{ marginBottom: '2rem' }}>
            Search and filter across all {SERVICES.length} government services available online.
          </p>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* ── Services Grid ── */}
      <section className="gsn-section">
        <div className="gsn-container">

          {/* Filter bar */}
          <div className="filter-bar" role="group" aria-label="Filter by category" style={{ marginBottom: '2rem' }}>
            <button
              className={`filter-btn${activeFilter === 'all' ? ' filter-btn--active' : ''}`}
              id="filter-all"
              onClick={() => setActiveFilter('all')}
            >
              All Services
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`filter-btn${activeFilter === c.id ? ' filter-btn--active' : ''}`}
                id={`filter-${c.id}`}
                onClick={() => setActiveFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p style={{ fontSize: '0.875rem', color: 'var(--gsn-text-muted)', marginBottom: '1.5rem' }}>
            Showing <strong>{filteredServices().length}</strong> service{filteredServices().length !== 1 ? 's' : ''}
            {activeFilter !== 'all' ? ` in ${CATEGORIES.find(c => c.id === activeFilter)?.label ?? activeFilter}` : ''}
            {query.trim() ? ` matching "${query.trim()}"` : ''}
          </p>

          {/* Grid */}
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
            <div className="gsn-grid gsn-grid--3">
              {filteredServices().map(s => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
