import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/src/assets/images/slide-1.png", mobileSrc: "/src/assets/images/slide-mobile-1.png", alt: "Toàn cảnh dây chuyền sản xuất tại Xưởng Gia Dụng Thiên Phát" },
  { src: "/src/assets/images/slide-2.png", mobileSrc: "/src/assets/images/slide-mobile-2.png", alt: "Khu vực gia công sản phẩm gia dụng" },
  { src: "/src/assets/images/slide-3.png", mobileSrc: "/src/assets/images/slide-mobile-3.png", alt: "Dây chuyền sản xuất và công nhân vận hành máy móc" },
  { src: "/src/assets/images/slide-4.png", mobileSrc: "/src/assets/images/slide-mobile-4.png", alt: "Khu vực lắp ráp và hoàn thiện sản phẩm" },
  { src: "/src/assets/images/slide-5.png", mobileSrc: "/src/assets/images/slide-mobile-5.png", alt: "Công nhân kiểm tra chất lượng sản phẩm" },
  { src: "/src/assets/images/slide-6.png", mobileSrc: "/src/assets/images/slide-mobile-6.png", alt: "Khu vực đóng gói thành phẩm" },
  { src: "/src/assets/images/slide-7.png", mobileSrc: "/src/assets/images/slide-mobile-7.png", alt: "Máy móc và thiết bị sản xuất hiện đại" },
  { src: "/src/assets/images/slide-8.png", mobileSrc: "/src/assets/images/slide-mobile-8.png", alt: "Nguyên vật liệu được sắp xếp trong kho xưởng" },
  { src: "/src/assets/images/slide-9.png", mobileSrc: "/src/assets/images/slide-mobile-9.png", alt: "Thành phẩm gia dụng trước khi xuất xưởng" },
  { src: "/src/assets/images/slide-10.png", mobileSrc: "/src/assets/images/slide-mobile-10.png", alt: "Toàn cảnh khu vực sản xuất và đóng gói" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchX, setTouchX] = useState(null);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play timer
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  // Reset timer on manual interaction
  const resetTimer = () => {
    clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 4000);
    }
  };

  const handleGoTo = (index) => {
    resetTimer();
    goTo(index);
  };

  const handleNext = () => {
    resetTimer();
    next();
  };

  const handlePrev = () => {
    resetTimer();
    prev();
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setPaused(true);
    const handler = (e) => { if (e.matches) setPaused(true); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
    setTouchX(null);
  };

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section
      id="hero"
      className="relative h-[85svh] mt-[112px] md:min-h-[92svh] md:mt-[80px] overflow-hidden bg-[#0f0e12]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
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
        onClick={handlePrev}
        aria-label="Ảnh trước"
        className="hidden md:flex absolute left-[24px] top-1/2 -translate-y-1/2 z-10 w-[48px] h-[48px] items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Ảnh tiếp theo"
        className="hidden md:flex absolute right-[24px] top-1/2 -translate-y-1/2 z-10 w-[48px] h-[48px] items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all"
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
                onClick={() => handleGoTo(i)}
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
