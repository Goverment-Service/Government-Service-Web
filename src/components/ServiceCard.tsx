import { useEffect, useRef } from 'react';
import type { Service } from '../data/services';
import { CATEGORIES } from '../data/categories';

const STATUS_LABELS: Record<string, string> = {
  online: 'Available Online',
  offline: 'In Person Only',
  pending: 'Partially Online',
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const cat = CATEGORIES.find(c => c.id === service.category) ?? { accent: '#1a56db' };
  const statusLabel = STATUS_LABELS[service.status] ?? service.status;

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
    <article
      ref={ref}
      className="gsn-card service-card gsn-reveal"
      data-category={service.category}
      data-id={service.id}
    >
      <div className="service-card__header">
        <span className={`gsn-badge gsn-badge--${service.status}`}>{statusLabel}</span>
        <span className="service-card__time">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
          {service.time}
        </span>
      </div>

      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>

      <div className="service-card__footer">
        <span className="service-card__dept" style={{ color: cat.accent }} title={service.department}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
          {service.department}
        </span>
        <a
          href="#"
          className="service-card__link"
          aria-label={`Access ${service.title}`}
          onClick={(e) => e.preventDefault()}
        >
          Access
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}
