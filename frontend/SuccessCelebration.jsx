import React, { useEffect } from 'react';
import './success-celebration.css';

const SuccessCelebration = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const curtain = document.createElement("div");
      curtain.className = "confetti";
      curtain.style.left = Math.random() * 100 + "vw";
      curtain.style.animationDuration = Math.random() * 2 + 3 + "s";
      document.body.appendChild(curtain);
      setTimeout(() => {
        curtain.remove();
      }, 5000);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="celebration-wrapper">
      <h1>🎉 Booking Confirmed! 🎊</h1>
    </div>
  );
};

export default SuccessCelebration;
