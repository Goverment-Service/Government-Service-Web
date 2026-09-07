import React from 'react';
import NavbarContent from '../../theme/Navbar/Content';
import Footer from '../../theme/Footer';

export default function Layout({ children, title, description }: any) {
  return (
    <div className="layout">
      <nav className="navbar">
        <NavbarContent />
      </nav>
      <main className="main-wrapper">
        {children}
      </main>
      <Footer />
    </div>
  );
}
