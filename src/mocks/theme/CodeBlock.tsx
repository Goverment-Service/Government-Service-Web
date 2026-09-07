import React from 'react';

export default function CodeBlock({ children, language, title }: any) {
  return (
    <div 
      style={{
        backgroundColor: '#292d3e',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        marginBottom: '1.5rem',
        color: '#bfc7d5',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: '0.9rem',
        lineHeight: '1.6'
      }}
    >
      {title && (
        <div 
          style={{
            backgroundColor: '#242838',
            padding: '0.8rem 1.2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#82aaff',
            fontWeight: 500,
            fontSize: '0.9rem'
          }}
        >
          {title}
        </div>
      )}
      <pre 
        style={{ 
          margin: 0, 
          padding: '1.2rem', 
          overflowX: 'auto', 
          backgroundColor: 'transparent' 
        }}
      >
        <code 
          className={language ? `language-${language}` : ''} 
          style={{ 
            whiteSpace: 'pre', 
            fontFamily: 'inherit',
            color: '#f8f8f2'
          }}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
