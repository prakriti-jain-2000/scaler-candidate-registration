import { useState } from "react";

const SCALER_LOGO_URL = "https://www.scaler.com/static/images/scaler-logo-white.svg";

const Navbar = () => {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <a href="#" className="flex items-center" aria-label="Scaler">
        {logoFailed ? (
          <span className="text-xl font-extrabold tracking-tight text-foreground">SCALER</span>
        ) : (
          <img
            src={SCALER_LOGO_URL}
            alt="Scaler"
            className="h-8 w-auto"
            onError={() => setLogoFailed(true)}
          />
        )}
      </a>
      <a
        href="https://candidate-dashboard-campus.lovable.app/login"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Already applied? Check status →
      </a>
    </nav>
  );
};

export default Navbar;
