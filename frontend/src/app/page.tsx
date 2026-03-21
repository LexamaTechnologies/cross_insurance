import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroSection } from "@/components/HeroSection";
import { MediaSection } from "@/components/MediaSection";
import { ProductsSection } from "@/components/ProductsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VisionSection } from "@/components/VisionSection";
import { config } from "@/lib/config";

export default function HomePage() {
  const phoneHref = `tel:${config.phoneNumber.replace(/[^\d+]/g, "")}`;
  const whatsappHref = `https://wa.me/${config.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <SiteHeader
        phoneDisplay={config.phoneNumber}
        phoneHref={phoneHref}
        whatsappHref={whatsappHref}
      />
      <main className="flex-1" id="inicio">
        <HeroSection />
        <AboutSection />
        <VisionSection />
        <ExperienceSection />
        <ProductsSection />
        <TestimonialsSection />
        <MediaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
