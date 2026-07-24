import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { navigationItems } from "../../data/siteContent";

export default function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const firstFocusableRef = useRef(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = menuRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    if (firstFocusableRef.current) firstFocusableRef.current.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(15, 14, 18, 0.6)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu điều hướng"
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] flex flex-col p-[24px] transition-transform duration-350 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#1e3a5f" }}
      >
        <div className="flex justify-end mb-[32px]">
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            aria-label="Đóng menu"
            className="w-[44px] h-[44px] flex items-center justify-center rounded-full border border-[#444] text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-[4px]">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleLinkClick}
              className="text-white text-[18px] font-normal py-[12px] px-[8px] hover:opacity-70 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-[24px]">
          <a
            href="#quote"
            onClick={handleLinkClick}
            className="inline-flex items-center justify-center rounded-full font-normal text-[14px] text-white border border-white px-[24px] py-[14px] min-h-[44px] hover:bg-white hover:text-[#1e3a5f] transition-colors"
          >
            Nhận báo giá
          </a>
        </div>
      </div>
    </>
  );
}
