import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
}

const LetterReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="whitespace-nowrap">
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="letter-animate"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
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
}: WorkCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const formattedIndex = String(index).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <motion.div
      ref={cardRef}
      className="works-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden">
        <img
          src={backgroundImage}
          alt="BG Image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 rounded-[32px] works-card-blur-overlay" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden noise-overlay pointer-events-none">
        <img
          src="/images/noise-texture.png"
          alt="noise"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 p-8 lg:p-12">
        {/* Left Column */}
        <div className="flex flex-col justify-between flex-1 min-h-[300px] lg:min-h-[400px]">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="works-card-content-text text-sm leading-relaxed max-w-md">
              {description}
            </p>
          </motion.div>

          {/* Brand Section */}
          <div className="mt-auto">
            {/* Counter */}
            <motion.div
              className="flex items-center gap-1 pb-4 border-b works-card-border"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="works-card-white text-sm">{formattedIndex}</span>
              <span className="works-card-white-muted text-sm">
                / {formattedTotal}
              </span>
            </motion.div>

            {/* Brand Name */}
            <h2 className="works-card-white text-4xl lg:text-5xl font-semibold mt-4 tracking-tight">
              <LetterReveal text={brandName} delay={0.3} />
            </h2>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
          {/* Cover Image */}
          <motion.a
            href={href}
            className="works-cover-border-outer rounded-3xl overflow-hidden flex-shrink-0 group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="works-cover-border-inner rounded-3xl overflow-hidden">
              <div className="relative w-[200px] sm:w-[250px] lg:w-[300px] aspect-[4/5] overflow-hidden rounded-3xl">
                <img
                  src={coverImage}
                  alt="Cover Image"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.a>

          {/* Metadata */}
          <motion.div
            className="flex flex-col justify-between py-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
                  <motion.p
                    key={i}
                    className="works-card-white text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                  >
                    {service}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
