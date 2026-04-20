import scalerLogo from "@/assets/scaler-logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <img
        src={scalerLogo}
        alt="Scaler"
        className="h-7 md:h-8 w-auto dark:invert"
      />
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
