import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

const WorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative bg-background py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          {/* Subtitle */}
          <motion.p
            className="works-subtitle mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            (Why clients love Agero)
          </motion.p>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
              <span className="works-heading-gradient">Recent Works</span>
            </h2>
          </motion.div>
        </div>

        {/* Cards Container */}
        <div className="space-y-8 lg:space-y-0">
          {worksData.map((work, index) => (
            <StickyCard
              key={work.brandName}
              index={index}
              scrollYProgress={scrollYProgress}
              totalCards={worksData.length}
            >
              <WorkCard
                index={index + 1}
                total={worksData.length}
                {...work}
              />
            </StickyCard>
          ))}
        </div>
      </div>
    </section>
  );
};

interface StickyCardProps {
  children: React.ReactNode;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalCards: number;
}

const StickyCard = ({
  children,
  index,
  scrollYProgress,
  totalCards,
}: StickyCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate scroll ranges for each card
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;

  // Scale down slightly as we scroll past
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [1, index === totalCards - 1 ? 1 : 0.95]
  );

  // Fade out as we scroll past (except last card)
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardEnd - 0.05, cardEnd],
    [1, 1, index === totalCards - 1 ? 1 : 0.6]
  );

  // Calculate top offset for stacking effect
  const topOffset = 80 + index * 20;

  return (
    <motion.div
      ref={cardRef}
      className="lg:sticky"
      style={{
        top: `${topOffset}px`,
        scale,
        opacity,
        zIndex: index + 1,
      }}
    >
      <div className="pb-8 lg:pb-16">{children}</div>
    </motion.div>
  );
};

export default WorksSection;
