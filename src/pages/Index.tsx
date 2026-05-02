import Navbar from "@/components/Navbar";
import PitchBattleHero from "@/components/PitchBattleHero";
import HeroSection from "@/components/HeroSection";
import LifeAtScalerSection from "@/components/LifeAtScalerSection";
import RolesSection from "@/components/RolesSection";

import RegistrationForm from "@/components/RegistrationForm";
import FloatingApplyButton from "@/components/FloatingApplyButton";
import scalerLogo from "@/assets/scaler-logo.svg";

import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Global constellation background across the whole site */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleBackground
          className="absolute inset-0 pointer-events-none"
          color="120,170,255"
          linkDistance={140}
          dotOpacity={0.7}
        />
      </div>

      <div className="relative z-10">
        <PitchBattleHero />
        <HeroSection />
        <LifeAtScalerSection />
        <RolesSection />
        <RegistrationForm />
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
