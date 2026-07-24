import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Button from "../common/Button";
import Container from "../layout/Container";
import { oemContent } from "../../data/siteContent";

export default function OEMSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="oem" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[40px] md:rounded-[80px] px-[28px] py-[48px] md:px-[48px] md:py-[60px] lg:px-[60px]"
          style={{ backgroundColor: "var(--color-paper-white, #ffffff)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[60px]">
            {/* Left: Label, headline, description */}
            <div>
              <SectionLabel text={oemContent.sectionLabel} />

              <h2
                className="font-light leading-[1] mb-[20px] md:mb-[28px]"
                style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
              >
                {oemContent.headline}
              </h2>

              <p
                className="leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1vw, 16px)",
                  color: "#555",
                }}
              >
                {oemContent.description}
              </p>
            </div>

            {/* Right: List items + CTAs */}
            <div className="flex flex-col justify-center">
              <ul className="flex flex-col gap-[16px] mb-[32px]">
                {oemContent.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-[12px]">
                    <span
                      className="inline-block flex-shrink-0 mt-[7px]"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#322d2a",
                      }}
                    />
                    <span
                      className="leading-relaxed"
                      style={{
                        fontSize: "clamp(15px, 1vw, 16px)",
                        color: "#322d2a",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-[12px]">
                <Button variant="filled" href="#quote" ariaLabel="Gửi yêu cầu sản phẩm">
                  {oemContent.ctaPrimary}
                </Button>
                <Button variant="ghost" href="#quote" ariaLabel="Trao đổi hợp tác">
                  {oemContent.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
