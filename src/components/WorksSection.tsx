import { useEffect, useRef, useState, useCallback } from "react";
import WorkCard from "./WorkCard";

const worksData = [
  {
    brandName: "Archin",
    description:
      "We've helped businesses across industries achieve their goals. Here are some of our selected works.",
    year: "2025",
    role: "Lead Designer",
    services: ["Website Design", "Product Design", "Branding", "Development"],
    backgroundImage: "/images/work-bg-1.webp",
    coverImage: "/images/work-cover-1.webp",
    href: "./works/archin",
  },
  {
    brandName: "VNTNR",
    description:
      "We've partnered with businesses across various industries to help them achieve their goals.",
    year: "2018",
    role: "Logo Designer",
    services: ["Designing", "Branding", "Redesigning", "Development"],
    backgroundImage: "/images/work-bg-2.webp",
    coverImage: "/images/work-cover-2.webp",
    href: "./works/vntnr",
  },
  {
    brandName: "Luxora",
    description:
      "Crafting digital experiences that elevate brands and drive meaningful engagement.",
    year: "2024",
    role: "Creative Director",
    services: ["UI/UX Design", "Branding", "Motion Design", "Development"],
    backgroundImage: "/images/work-bg-3.webp",
    coverImage: "/images/work-cover-1.webp",
    href: "./works/luxora",
  },
];

const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const useCardExitAnimation = (cardRefs: React.RefObject<(HTMLDivElement | null)[]>) => {
  const [exitProgress, setExitProgress] = useState<number[]>(
    new Array(worksData.length).fill(0)
  );

  const handleScroll = useCallback(() => {
    if (!cardRefs.current) return;

    const newProgress = cardRefs.current.map((cardEl, index) => {
      if (!cardEl) return 0;

      const rect = cardEl.getBoundingClientRect();
      const stickyTop = 80 + index * 20;
      
      // Calculate how much the card has been "pushed up" by the next card
      // When the card is at its sticky position, progress is 0
      // As the next card pushes it, progress goes from 0 to 1
      if (rect.top <= stickyTop && index < worksData.length - 1) {
        const nextCardEl = cardRefs.current?.[index + 1];
        if (nextCardEl) {
          const nextRect = nextCardEl.getBoundingClientRect();
          const cardHeight = rect.height;
          const overlap = (stickyTop + cardHeight) - nextRect.top;
          const progress = Math.max(0, Math.min(1, overlap / (cardHeight * 0.5)));
          return progress;
        }
      }
      return 0;
    });

    setExitProgress(newProgress);
  }, [cardRefs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return exitProgress;
};

const WorksSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const exitProgress = useCardExitAnimation(cardRefs);

  return (
    <section className="relative bg-background py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          {/* Subtitle */}
          <p className={`works-subtitle mb-4 scroll-reveal ${headerVisible ? "visible" : ""}`}>
            (Why clients love Agero)
          </p>

          {/* Heading */}
          <div className={`scroll-reveal delay-100 ${headerVisible ? "visible" : ""}`}>
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
              <span className="works-heading-gradient">Recent Works</span>
            </h2>
          </div>
        </div>

        {/* Cards Container - Sticky Stack */}
        <div className="space-y-8 lg:space-y-0">
          {worksData.map((work, index) => {
            const progress = exitProgress[index];
            const scale = 1 - progress * 0.15; // Scale from 1 to 0.85
            const rotate = progress * 30; // Rotate from 0 to 30 degrees
            const opacity = 1 - progress; // Opacity from 1 to 0

            return (
              <div
                key={work.brandName}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="lg:sticky pb-8 lg:pb-16"
                style={{
                  top: `${80 + index * 20}px`,
                  zIndex: index + 1,
                }}
              >
                <div
                  className="transition-transform duration-100 ease-out origin-center"
                  style={{
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    opacity: opacity,
                  }}
                >
                  <WorkCard index={index + 1} total={worksData.length} priority={index === 0} {...work} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
