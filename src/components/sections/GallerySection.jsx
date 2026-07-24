import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import Container from "../layout/Container";
import { factoryGallery } from "../../data/siteContent";

const galleryLayout = [
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
  { aspectRatio: "4 / 3" },
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lightboxRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const openLightbox = useCallback((index) => {
    previousFocusRef.current = document.activeElement;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? factoryGallery.length - 1 : prev - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === factoryGallery.length - 1 ? 0 : prev + 1
    );
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Tab":
          if (lightboxRef.current) {
            const focusable = lightboxRef.current.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length === 0) {
              e.preventDefault();
              return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
              if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
              }
            } else {
              if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
              }
            }
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section id="gallery" className="pt-[24px] pb-[48px] md:pt-[40px] md:pb-[100px]">
      <Container>
        <div>
          <SectionLabel text="NHÀ XƯỞNG" />

          <h2
            className="font-light leading-[1] mb-[48px] md:mb-[64px]"
            style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
          >
            Hình ảnh nhà xưởng
          </h2>

          {/* Gallery grid - asymmetric masonry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[16px]">
            {factoryGallery.map((image, index) => {
              const layout = galleryLayout[index] || { aspectRatio: "4 / 3" };
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  className="cursor-pointer overflow-hidden rounded-[24px] md:rounded-[48px]"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mở ảnh: ${image.alt}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                >
                  <div className="group relative overflow-hidden aspect-[4/3]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-contain p-[0%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh nhà xưởng"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ backgroundColor: "rgba(15,14,18,0.92)" }}
            onClick={handleOverlayClick}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={closeLightbox}
              aria-label="Đóng"
              className="absolute top-[16px] right-[16px] md:top-[24px] md:right-[24px] z-10 flex items-center justify-center w-[44px] h-[44px] text-white hover:opacity-70 transition-opacity"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Ảnh trước"
              className="absolute left-[8px] md:left-[24px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-[44px] h-[44px] text-white hover:opacity-70 transition-opacity"
            >
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Ảnh tiếp theo"
              className="absolute right-[8px] md:right-[24px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-[44px] h-[44px] text-white hover:opacity-70 transition-opacity"
            >
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center justify-center px-[24px] md:px-[80px] pt-[64px] pb-[100px] md:py-[40px] w-full"
            >
              <img
                src={factoryGallery[currentImageIndex].src}
                alt={factoryGallery[currentImageIndex].alt}
                className="max-h-[85vh] max-w-full w-auto h-auto rounded-[16px] object-contain"
                style={{ backgroundColor: "transparent" }}
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 text-white text-[13px] tracking-[0.08em] font-light">
              {currentImageIndex + 1} / {factoryGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
