import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { qualityItems } from "../../data/siteContent";

export default function QualitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="quality"
      className="py-[48px] md:py-[100px]"
      style={{ backgroundColor: "var(--color-paper-white, #ffffff)" }}
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text="CHẤT LƯỢNG" />

          <h2
            className="font-light leading-[1] mb-[48px] md:mb-[64px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Hệ thống kiểm soát chất lượng
          </h2>

          <div>
            {qualityItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.2 + index * 0.1,
                }}
                className="grid grid-cols-1 md:grid-cols-[32%_1fr] gap-[12px] md:gap-[24px] py-[24px] md:py-[28px]"
                style={{ borderBottom: "1px solid rgba(50,45,42,0.15)" }}
              >
                <h3
                  className="font-normal leading-snug"
                  style={{ fontSize: "clamp(16px, 1.2vw, 18px)", color: "#322d2a" }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: "clamp(15px, 1vw, 16px)",
                    color: "#555",
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
