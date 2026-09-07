import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarItem({ to, href, label, className, html }: any) {
  if (html) {
    if (href) {
      return <a href={href} className={className} dangerouslySetInnerHTML={{ __html: html }} target="_blank" rel="noopener noreferrer" />;
    }
    return <Link to={to} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  if (href) {
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{label}</a>;
  }
  return <Link to={to} className={className}>{label}</Link>;
}
