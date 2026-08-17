// Government Service Navigator — Category Data

export interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
  count: number;
  accent: string;
  accentSoft: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'health',
    label: 'Health & Medical',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    description: 'Hospitals, insurance, vaccinations & medical records',
    count: 42,
    accent: '#ef4444',
    accentSoft: '#fef2f2',
  },
  {
    id: 'education',
    label: 'Education',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    description: 'Scholarships, school enrollment & student services',
    count: 38,
    accent: '#3b82f6',
    accentSoft: '#eff6ff',
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    description: 'Driving licenses, vehicle registration & transit',
    count: 28,
    accent: '#f59e0b',
    accentSoft: '#fffbeb',
  },
  {
    id: 'legal',
    label: 'Legal & Justice',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    description: 'ID documents, passports, legal aid & courts',
    count: 31,
    accent: '#8b5cf6',
    accentSoft: '#f5f3ff',
  },
  {
    id: 'tax',
    label: 'Tax & Finance',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    description: 'Income tax, GST filing, financial aid & grants',
    count: 24,
    accent: '#059669',
    accentSoft: '#ecfdf5',
  },
  {
    id: 'welfare',
    label: 'Social Welfare',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    description: 'Housing assistance, pensions & social support',
    count: 35,
    accent: '#ec4899',
    accentSoft: '#fdf2f8',
  },
  {
    id: 'environment',
    label: 'Environment & Land',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22V12"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12c0-4.42 3.58-8 8-8-1.05 3.66-3.58 6.72-8 8z"/><path d="M12 12c0-4.42-3.58-8-8-8 1.05 3.66 3.58 6.72 8 8z"/></svg>`,
    description: 'Land registration, permits & environmental services',
    count: 19,
    accent: '#10b981',
    accentSoft: '#ecfdf5',
  },
  {
    id: 'business',
    label: 'Business & Commerce',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    description: 'Business registration, trade licenses & commerce',
    count: 33,
    accent: '#6366f1',
    accentSoft: '#eef2ff',
  },
];
