import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/images/slide-1.png", mobileSrc: "/images/slide-mobile-1.png", alt: "Toàn cảnh dây chuyền sản xuất tại Xưởng Gia Dụng Thiên Phát" },
  { src: "/images/slide-2.png", mobileSrc: "/images/slide-mobile-2.png", alt: "Khu vực gia công sản phẩm gia dụng" },
  { src: "/images/slide-3.png", mobileSrc: "/images/slide-mobile-3.png", alt: "Dây chuyền sản xuất và công nhân vận hành máy móc" },
  { src: "/images/slide-4.png", mobileSrc: "/images/slide-mobile-4.png", alt: "Khu vực lắp ráp và hoàn thiện sản phẩm" },
  { src: "/images/slide-5.png", mobileSrc: "/images/slide-mobile-5.png", alt: "Công nhân kiểm tra chất lượng sản phẩm" },
  { src: "/images/slide-6.png", mobileSrc: "/images/slide-mobile-6.png", alt: "Khu vực đóng gói thành phẩm" },
  { src: "/images/slide-7.png", mobileSrc: "/images/slide-mobile-7.png", alt: "Máy móc và thiết bị sản xuất hiện đại" },
  { src: "/images/slide-8.png", mobileSrc: "/images/slide-mobile-8.png", alt: "Nguyên vật liệu được sắp xếp trong kho xưởng" },
  { src: "/images/slide-9.png", mobileSrc: "/images/slide-mobile-9.png", alt: "Thành phẩm gia dụng trước khi xuất xưởng" },
  { src: "/images/slide-10.png", mobileSrc: "/images/slide-mobile-10.png", alt: "Toàn cảnh khu vực sản xuất và đóng gói" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    setTouchStart(null);
  };

  return (
    <section
      id="hero"
      className="relative h-[85svh] mt-[112px] md:min-h-[92svh] md:mt-[80px] overflow-hidden bg-[#0f0e12]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <picture className="w-full h-full">
            <source
              media="(max-width: 767px)"
              srcSet={slides[current].mobileSrc}
            />
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* Bottom fade for dot visibility */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[5]"
        style={{
          background: "linear-gradient(to top, rgba(15,14,18,0.5) 0%, transparent 100%)",
        }}
      />

      {/* Arrows - hidden on mobile (swipe instead) */}
      <button
        onClick={prev}
        aria-label="Ảnh trước"
        className="flex absolute left-[12px] md:left-[24px] top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Ảnh tiếp theo"
        className="flex absolute right-[12px] md:right-[24px] top-1/2 -translate-y-1/2 z-10 w-[44px] h-[44px] items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>

      {/* Bottom bar: counter + dots */}
      <div className="absolute bottom-[28px] md:bottom-[40px] left-0 right-0 z-10">
        <div className="flex items-center justify-center gap-[16px] md:gap-[24px]">
          {/* Counter */}
          <span className="text-white/70 text-[12px] md:text-[14px] font-light tracking-[0.06em] tabular-nums min-w-[36px] text-right">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>

          {/* Dots */}
          <div className="flex gap-[2px]">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ảnh ${i + 1}`}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-transparent border-none cursor-pointer"
              >
                <span
                  className="rounded-full transition-all duration-300 block"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
