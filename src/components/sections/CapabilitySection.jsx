import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import ResponsiveImage from "../common/ResponsiveImage";
import Accordion from "../common/Accordion";
import Container from "../layout/Container";
import { capabilities, placeholderImages } from "../../data/siteContent";

export default function CapabilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="capability" className="py-[48px] md:py-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text="NĂNG LỰC" />

          <h2
            className="font-light leading-[1] mb-[40px] md:mb-[56px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Năng lực sản xuất
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-start">
            {/* Left: Image */}
            <div>
              <ResponsiveImage
                src={placeholderImages.capability}
                alt="Dây chuyền sản xuất tại Xưởng Gia Dụng Thiên Phát"
                className="rounded-[40px] md:rounded-[80px]"
                aspectRatio="4/5"
                loading="lazy"
              />
            </div>

            {/* Right: Accordion */}
            <div>
              <Accordion items={capabilities} />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}