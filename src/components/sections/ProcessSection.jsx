import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { productionSteps } from "../../data/siteContent";

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      }}
    >
      {/* Desktop: simple card with top border */}
      <div
        className="hidden md:block pt-[24px]"
        style={{ borderTop: "1px solid #322d2a" }}
      >
        <p
          className="font-light leading-none mb-[12px]"
          style={{
            fontSize: "clamp(48px, 5vw, 56px)",
            color: "#322d2a",
          }}
        >
          {step.number}
        </p>
        <h3
          className="font-normal leading-snug"
          style={{ fontSize: "16px" }}
        >
          {step.title}
        </h3>
        <p
          className="leading-relaxed mt-[8px]"
          style={{ fontSize: "15px", color: "#555" }}
        >
          {step.description}
        </p>
      </div>

      {/* Mobile: vertical timeline with left border */}
      <div className="block md:hidden relative pl-[28px] pb-[32px]">
        {/* Vertical connector line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ backgroundColor: "#322d2a" }}
        />

        {/* Dot on the line */}
        <div
          className="absolute left-[-4px] top-[4px] w-[10px] h-[10px] rounded-full"
          style={{ backgroundColor: "#322d2a" }}
        />

        <p
          className="font-light leading-none mb-[8px]"
          style={{
            fontSize: "clamp(40px, 8vw, 48px)",
            color: "#322d2a",
          }}
        >
          {step.number}
        </p>
        <h3
          className="font-normal leading-snug"
          style={{ fontSize: "16px" }}
        >
          {step.title}
        </h3>
        <p
          className="leading-relaxed mt-[8px]"
          style={{ fontSize: "15px", color: "#555" }}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="process" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <div ref={ref}>
          <SectionLabel text="QUY TRÌNH" />

          <h2
            className="font-light leading-[1] mb-[40px] md:mb-[56px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Quy trình sản xuất
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] md:gap-x-[32px] gap-y-[0px]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0 } },
              hidden: {},
            }}
          >
            {productionSteps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}