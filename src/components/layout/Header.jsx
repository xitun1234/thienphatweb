import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import Container from "./Container";
import useScrollSpy from "../../hooks/useScrollSpy";
import { navigationItems, companyInfo } from "../../data/siteContent";

const sectionIds = ["about", "products", "process", "gallery", "quote"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds, 100);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300 py-[4px]"
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img
                src="/logo.png"
                alt="Xưởng Gia Dụng Thiên Phát"
                className="h-[80px] md:h-[100px] w-auto"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center rounded-full px-[8px] py-[4px]"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              {navigationItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive =
                  sectionId === ""
                    ? activeId === sectionIds[0] && window.scrollY < 200
                    : activeId === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[13px] font-normal px-[16px] py-[10px] rounded-full transition-opacity duration-200"
                    style={{
                      color: "#ffffff",
                      opacity: isActive ? 1 : 0.7,
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.target.style.opacity = "1"; }}
                    onMouseLeave={(e) => { if (!isActive) e.target.style.opacity = "0.7"; }}
                  >
                    {item.label}
                  </a>
                );
              })}
              <span className="mx-[4px] w-[1px] h-[20px]" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
              <a
                href="#quote"
                className="text-[13px] font-normal px-[16px] py-[10px] rounded-full transition-opacity"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={(e) => { e.target.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.target.style.color = "rgba(255,255,255,0.8)"; }}
              >
                Nhận báo giá
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden w-[44px] h-[44px] flex items-center justify-center"
              aria-label="Mở menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} color="#322d2a" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
