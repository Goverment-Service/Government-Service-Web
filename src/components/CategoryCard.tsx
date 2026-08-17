import { useEffect, useRef } from 'react';
import type { Category } from '../data/categories';

interface CategoryCardProps {
  cat: Category;
  onSelect: (id: string) => void;
  visible?: boolean;
}

export default function CategoryCard({ cat, onSelect, visible }: CategoryCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

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
    <a
      ref={ref}
      href="#services"
      className={`gsn-card category-card gsn-reveal${visible ? ' gsn-reveal--visible' : ''}`}
      data-category-id={cat.id}
      style={{ '--cat-accent': cat.accent, '--cat-soft': cat.accentSoft } as React.CSSProperties}
      aria-label={`Browse ${cat.label} — ${cat.count} services`}
      onClick={(e) => { e.preventDefault(); onSelect(cat.id); }}
    >
      <div className="category-card__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: cat.icon }} />
      <h3 className="category-card__title">{cat.label}</h3>
      <p className="category-card__desc">{cat.description}</p>
      <div className="category-card__footer">
        <span className="category-card__count">{cat.count} services</span>
        <svg className="category-card__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </a>
  );
}
