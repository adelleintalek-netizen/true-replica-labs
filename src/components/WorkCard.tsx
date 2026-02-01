import { useEffect, useRef, useState } from "react";

interface WorkCardProps {
  index: number;
  total: number;
  brandName: string;
  description: string;
  year: string;
  role: string;
  services: string[];
  backgroundImage: string;
  coverImage: string;
  href: string;
  priority?: boolean; // First card should load eagerly for LCP
}

const LetterReveal = ({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) => {
  return (
    <span className="whitespace-nowrap">
      {text.split("").map((letter, i) => (
        <span
          key={i}
          className="letter-animate"
          style={{ animationDelay: `${baseDelay + i * 0.05}s` }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};

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
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const WorkCard = ({
  index,
  total,
  brandName,
  description,
  year,
  role,
  services,
  backgroundImage,
  coverImage,
  href,
  priority = false,
}: WorkCardProps) => {
  const { ref: cardRef, isVisible } = useScrollReveal();

  const formattedIndex = String(index).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className={`works-card scroll-reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden">
        <img
          src={backgroundImage}
          alt="BG Image"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 rounded-[32px] works-card-blur-overlay" />

      {/* CSS Noise Overlay - no image needed */}
      <div className="absolute inset-0 rounded-[32px] noise-overlay pointer-events-none" />
      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 p-8 lg:p-12">
        {/* Left Column */}
        <div className="flex flex-col justify-between flex-1 min-h-[300px] lg:min-h-[400px]">
          {/* Description */}
          <div className={`scroll-reveal delay-100 ${isVisible ? "visible" : ""}`}>
            <p className="works-card-content-text text-sm leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          {/* Brand Section */}
          <div className="mt-auto">
            {/* Counter */}
            <div className={`flex items-center gap-1 pb-4 border-b works-card-border scroll-reveal delay-200 ${isVisible ? "visible" : ""}`}>
              <span className="works-card-white text-sm">{formattedIndex}</span>
              <span className="works-card-white-muted text-sm">
                / {formattedTotal}
              </span>
            </div>

            {/* Brand Name */}
            {isVisible && (
              <h2 className="works-card-white text-4xl lg:text-5xl font-semibold mt-4 tracking-tight">
                <LetterReveal text={brandName} baseDelay={0.3} />
              </h2>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
          {/* Cover Image */}
          <a
            href={href}
            className={`works-cover-border-outer rounded-3xl overflow-hidden flex-shrink-0 group scroll-reveal-scale delay-200 ${isVisible ? "visible" : ""}`}
          >
            <div className="works-cover-border-inner rounded-3xl overflow-hidden">
              <div className="relative w-[200px] sm:w-[250px] lg:w-[300px] aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src={coverImage}
                  alt="Cover Image"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </a>

          {/* Metadata */}
          <div className={`flex flex-col justify-between py-2 scroll-reveal-right delay-300 ${isVisible ? "visible" : ""}`}>
            {/* Top: Year & Role */}
            <div className="space-y-4">
              <div>
                <p className="works-card-white-muted text-sm">Year</p>
                <h6 className="works-card-white text-base font-medium mt-1">
                  {year}
                </h6>
              </div>
              <div>
                <p className="works-card-white-muted text-sm">Role</p>
                <p className="works-card-white text-sm mt-1">{role}</p>
              </div>
            </div>

            {/* Bottom: Services */}
            <div className="mt-6 lg:mt-0">
              <p className="works-card-white-muted text-sm mb-2">Services</p>
              <div className="space-y-1">
                {services.map((service, i) => (
                  <p
                    key={i}
                    className={`works-card-white text-sm scroll-reveal ${isVisible ? "visible" : ""}`}
                    style={{ transitionDelay: `${0.4 + i * 0.05}s` }}
                  >
                    {service}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
