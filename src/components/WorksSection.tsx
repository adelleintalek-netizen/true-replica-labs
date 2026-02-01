import { useEffect, useRef, useState } from "react";
import WorkCard from "./WorkCard";

const worksData = [
  {
    brandName: "Archin",
    description:
      "We've helped businesses across industries achieve their goals. Here are some of our selected works.",
    year: "2025",
    role: "Lead Designer",
    services: ["Website Design", "Product Design", "Branding", "Development"],
    backgroundImage: "/images/work-bg-1.png",
    coverImage: "/images/work-cover-1.png",
    href: "./works/archin",
  },
  {
    brandName: "VNTNR",
    description:
      "We've partnered with businesses across various industries to help them achieve their goals.",
    year: "2018",
    role: "Logo Designer",
    services: ["Designing", "Branding", "Redesigning", "Development"],
    backgroundImage: "/images/work-bg-2.png",
    coverImage: "/images/work-cover-2.png",
    href: "./works/vntnr",
  },
  {
    brandName: "Luxora",
    description:
      "Crafting digital experiences that elevate brands and drive meaningful engagement.",
    year: "2024",
    role: "Creative Director",
    services: ["UI/UX Design", "Branding", "Motion Design", "Development"],
    backgroundImage: "/images/work-bg-3.png",
    coverImage: "/images/work-cover-1.png",
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

const WorksSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

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
          {worksData.map((work, index) => (
            <div
              key={work.brandName}
              className="lg:sticky pb-8 lg:pb-16"
              style={{
                top: `${80 + index * 20}px`,
                zIndex: index + 1,
              }}
            >
              <WorkCard index={index + 1} total={worksData.length} {...work} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
