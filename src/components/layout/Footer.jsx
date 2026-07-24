import Container from "./Container";
import { companyInfo, contactInfo, navigationItems } from "../../data/siteContent";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0f0e12", color: "#ffffff" }}>
      <Container className="py-[60px] md:py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[48px]">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="text-[22px] font-normal tracking-[0.03em] mb-[16px]">
              {companyInfo.brandName}
            </div>
            <p className="text-[15px] leading-relaxed text-white/60 max-w-[360px]">
              {companyInfo.fullName} — {companyInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="text-[12px] uppercase tracking-[0.12em] text-white/40 mb-[16px]">
              Điều hướng
            </div>
            <nav className="flex flex-col gap-[10px]">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[15px] text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="text-[12px] uppercase tracking-[0.12em] text-white/40 mb-[16px]">
              Liên hệ
            </div>
            <div className="text-[15px] text-white/60 space-y-[8px]">
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
              <p>{contactInfo.address}</p>
              <p>{contactInfo.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-[60px] pt-[24px] border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-[16px] text-[12px] text-white/40">
          <p>&copy; {currentYear} {companyInfo.fullName}. Bảo lưu mọi quyền.</p>
          <div className="flex gap-[24px]">
            <a href="#" className="hover:text-white/70 transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Điều khoản sử dụng
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
