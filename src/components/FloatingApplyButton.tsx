import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingApplyButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#apply"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg glow-orange glow-orange-hover transition-all hover:scale-105"
        >
          Apply now →
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingApplyButton;
