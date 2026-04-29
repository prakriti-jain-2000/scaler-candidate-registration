import scalerLogo from "@/assets/scaler-logo.svg";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-background/80 backdrop-blur-xl border-b border-border">
      <a href="#" className="flex items-center" aria-label="Scaler">
        <img src={scalerLogo} alt="Scaler" className="h-10 md:h-12 w-auto brightness-0 invert" />
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
