import React, { useState, useEffect } from "react";
import "./backtotop.scss";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // montrer la bouton quand le user scroll down
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200; // seuil d'affichage

      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`back-to-top ${isVisible ? "visible" : ""}`}>
      <button className="back-to-top-button" onClick={scrollToTop}>
        <span>&uarr;</span>
      </button>
    </div>
  );
};

export default BackToTopButton;
