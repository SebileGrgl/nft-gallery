import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import { ArrowUp } from "lucide-react";
import { ScrollToTopProps } from "@/types";

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  className,
  showAfter,
  position,
  variant,
  size,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > showAfter);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-center": "bottom-6 left-1/2 transform -translate-x-1/2",
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-300 ease-in-out",
        "animate-in slide-in-from-bottom-8 fade-in-0",
        positionClasses[position],
        className
      )}
    >
      <Button
        variant={variant}
        size={size}
        onClick={scrollToTop}
        className="rounded-full p-3 shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
        aria-label="Scroll to top"
        title="Yukarı çık"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
