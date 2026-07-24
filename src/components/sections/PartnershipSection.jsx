import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { partnershipReasons } from "../../data/siteContent";

export default function PartnershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="partnership" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text="HỢP TÁC" />

          <h2
            className="font-light leading-[1] mb-[48px] md:mb-[64px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Lý do hợp tác
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[32px]">
            {partnershipReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="rounded-[24px] md:rounded-[40px] p-[28px] md:p-[32px]"
                style={{
                  border: "1px solid #322d2a",
                  backgroundColor: "transparent",
                }}
              >
                <h3
                  className="font-normal leading-snug mb-[8px]"
                  style={{
                    fontSize: "clamp(17px, 1.3vw, 20px)",
                    color: "#322d2a",
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: "clamp(15px, 1vw, 16px)",
                    color: "#555",
                  }}
                >
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
