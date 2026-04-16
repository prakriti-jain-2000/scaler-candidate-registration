import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RolesSection from "@/components/RolesSection";
import WhyScalerSection from "@/components/WhyScalerSection";
import ProcessSection from "@/components/ProcessSection";
import RegistrationForm from "@/components/RegistrationForm";
import FloatingApplyButton from "@/components/FloatingApplyButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <RolesSection />
      <WhyScalerSection />
      <ProcessSection />
      <RegistrationForm />
      <FloatingApplyButton />
      <footer className="py-12 px-6 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          © 2025 Scaler Academy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
