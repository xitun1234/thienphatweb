import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { productCategories } from "../../data/siteContent";

function ProductCard({ category, index }) {
  const [imgError, setImgError] = useState(false);

  const aspectRatioClass =
    category.large ? "aspect-[4/2.5]" : "aspect-[4/3]";

  const gridClass = category.large
    ? "md:col-span-2"
    : "";

  return (
    <div
      className={`group relative overflow-hidden rounded-[40px] md:rounded-[80px] ${aspectRatioClass} ${gridClass}`}
    >
      {imgError ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: "#e8e7e2" }}
        >
          <span
            className="text-center px-[16px]"
            style={{ color: "#8b8b8b", fontSize: "15px" }}
          >
            {category.name}
          </span>
        </div>
      ) : (
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-contain p-[0%] transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      {/* Text readability overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none"
        style={{ backgroundColor: "rgba(15,14,18,0.35)" }}
      />

      {/* Text overlay */}
      <div className="absolute bottom-[16px] md:bottom-[24px] left-0 right-0 flex justify-center px-[20px] md:px-[28px]">
        <h3
          className="font-normal leading-tight text-center"
          style={{
            color: "#ffffff",
            fontSize: "clamp(16px, 2vw, 19px)",
          }}
        >
          {category.name}
        </h3>
      </div>
    </div>
  );
}

export default function ProductSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="products" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel text="SẢN PHẨM" />

          <h2
            className="font-light leading-[1] mb-[40px] md:mb-[56px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Danh mục sản phẩm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[20px]">
            {productCategories.map((category, index) => (
              <ProductCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}