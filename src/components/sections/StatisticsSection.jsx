import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { statistics } from "../../data/siteContent";

export default function StatisticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="statistics" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text="SỐ LIỆU" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[20px]">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="rounded-[24px] p-[28px] md:p-[32px]"
                style={{
                  border: "1px solid #322d2a",
                  backgroundColor: "transparent",
                }}
              >
                <p
                  className="font-light leading-none mb-[12px]"
                  style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    color: "#322d2a",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="uppercase tracking-[0.04em] leading-snug"
                  style={{
                    fontSize: "13px",
                    color: "#8b8b8b",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}