import React, {useEffect, useRef, useState} from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({children, className, delay = 0}: Props): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {threshold: 0.15},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[className, 'os-reveal', visible ? 'os-reveal--visible' : ''].filter(Boolean).join(' ')}
      style={{transitionDelay: `${delay}ms`}}>
      {children}
    </div>
  );
}
