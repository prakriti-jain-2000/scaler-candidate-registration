import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RolesSection from "@/components/RolesSection";
import WhyScalerSection from "@/components/WhyScalerSection";

import RegistrationForm from "@/components/RegistrationForm";
import FloatingApplyButton from "@/components/FloatingApplyButton";
import scalerLogo from "@/assets/scaler-logo.svg";

import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Subtle dot network behind the rest of the dark page */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <ParticleBackground
            className="absolute inset-0 pointer-events-none opacity-50"
            color="120,170,255"
            linkDistance={120}
            dotOpacity={0.4}
          />
        </div>
        <div className="relative z-10">
          <RolesSection />
          <WhyScalerSection />
          <RegistrationForm />
        </div>
      </div>

      <FloatingApplyButton />
      <footer className="relative z-10 py-12 px-6 text-center border-t border-border bg-background">
        <img
          src={scalerLogo}
          alt="Scaler"
          className="h-10 w-auto mx-auto mb-4 brightness-0 invert"
        />
        <p className="text-sm text-muted-foreground">
          © 2025 Scaler Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
