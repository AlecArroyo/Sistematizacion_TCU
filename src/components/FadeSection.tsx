import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface FadeSectionProps {
  children: ReactNode;
  className?: string;
}

const FadeSection: React.FC<FadeSectionProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    // Si ya está en el viewport al montar, mostrar inmediatamente
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
          else setVisible(false);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`
        transition-all duration-500 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        ${className}
      `}
    >
      {children}
    </section>
  );
};

export default FadeSection;