import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import QuoteForm from "../forms/QuoteForm";
import { quoteContent, contactInfo } from "../../data/siteContent";

export default function QuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="quote" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text={quoteContent.sectionLabel} />

          <h2
            className="font-light leading-[1] mb-[16px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            {quoteContent.headline}
          </h2>

          <p className="text-[15px] md:text-[16px] leading-relaxed text-[#555] mb-[40px] md:mb-[60px] max-w-[600px]">
            {quoteContent.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-[60px] lg:gap-[80px]">
            {/* Left: Quote Form */}
            <div>
              <QuoteForm />
            </div>

            {/* Right: Contact Information */}
            <div>
              <span
                className="block text-[12px] uppercase tracking-[0.12em] mb-[28px]"
                style={{ color: "#8b8b8b" }}
              >
                Thông tin liên hệ
              </span>

              <div className="flex flex-col gap-[20px]">
                <div>
                  <span
                    className="block text-[12px] md:text-[13px] uppercase tracking-[0.08em] mb-[4px]"
                    style={{ color: "#8b8b8b" }}
                  >
                    Điện thoại
                  </span>
                  <span
                    className="block text-[15px] md:text-[16px]"
                    style={{ color: "#322d2a" }}
                  >
                    {contactInfo.phone}
                  </span>
                </div>

                <div>
                  <span
                    className="block text-[12px] md:text-[13px] uppercase tracking-[0.08em] mb-[4px]"
                    style={{ color: "#8b8b8b" }}
                  >
                    Email
                  </span>
                  <span
                    className="block text-[15px] md:text-[16px]"
                    style={{ color: "#322d2a" }}
                  >
                    {contactInfo.email}
                  </span>
                </div>

                <div>
                  <span
                    className="block text-[12px] md:text-[13px] uppercase tracking-[0.08em] mb-[4px]"
                    style={{ color: "#8b8b8b" }}
                  >
                    Địa chỉ
                  </span>
                  <span
                    className="block text-[15px] md:text-[16px]"
                    style={{ color: "#322d2a" }}
                  >
                    {contactInfo.address}
                  </span>
                </div>

                <div>
                  <span
                    className="block text-[12px] md:text-[13px] uppercase tracking-[0.08em] mb-[4px]"
                    style={{ color: "#8b8b8b" }}
                  >
                    Giờ làm việc
                  </span>
                  <span
                    className="block text-[15px] md:text-[16px]"
                    style={{ color: "#322d2a" }}
                  >
                    {contactInfo.workingHours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
