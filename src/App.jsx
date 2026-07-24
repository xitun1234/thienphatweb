import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import StatisticsSection from "./components/sections/StatisticsSection";
import ProductSection from "./components/sections/ProductSection";
import ProcessSection from "./components/sections/ProcessSection";
import GallerySection from "./components/sections/GallerySection";
import OEMSection from "./components/sections/OEMSection";
import PartnershipSection from "./components/sections/PartnershipSection";
import QuoteSection from "./components/sections/QuoteSection";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatisticsSection />
        <ProductSection />
        <ProcessSection />
        <GallerySection />
        <OEMSection />
        <PartnershipSection />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
