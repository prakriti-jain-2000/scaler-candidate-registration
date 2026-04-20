const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center gap-1">
        <span className="text-xl font-extrabold tracking-tight text-foreground">SCALER</span>
        <span className="w-2 h-2 rounded-full bg-primary -mt-2" />
      </div>
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
