import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { aboutContent } from "../../data/siteContent";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="pt-[48px] pb-[0px] md:pt-[100px] md:pb-[0px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className=""
        >
          <SectionLabel text={aboutContent.sectionLabel} />
          <h2
            className="font-light leading-[1] mb-[20px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            {aboutContent.headline}
          </h2>
          <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555]">
            {aboutContent.description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
