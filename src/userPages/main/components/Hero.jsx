import React, { useEffect, useRef, useState } from "react";

import anime from "animejs";
import ModalsWrapper from "../../navBar/components/modals/ModalsWrapper";

const Hero = () => {
  const [showModals, setShowModals] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const openPopup = () => {
    setIsMounted(true);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => setIsMounted(false), 500);
  };

  // Use window size hook for responsiveness
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    
    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    
      window.addEventListener("resize", handleResize);
      handleResize();
    
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return windowSize;
  }

  // Get current window size
  const { width: windowWidth } = useWindowSize();

  const imgRef = useRef(null);

  useEffect(() => {
    anime({
      targets: imgRef.current,
      opacity: [0, 1],
      translateY: [-5000, 0],
      duration: 5000,
      easing: "easeOutExpo",
    });
  }, []);

  // Calculate SVG sizes based on window width
  const getResponsiveSVGSize = (baseSize, windowWidth) => {
    if (windowWidth < 640) { // mobile
      return baseSize * 0.6;
    } else if (windowWidth < 768) { // small tablet
      return baseSize * 0.7;
    } else if (windowWidth < 1024) { // larger tablet
      return baseSize * 0.8;
    } else if (windowWidth < 1280) { // small desktop
      return baseSize * 0.9;
    } else { // large desktop
      return baseSize;
    }
  };

  // SVG sizes calculation
  const smallCircleSize = getResponsiveSVGSize(25, windowWidth);
  const mediumCircleSize = getResponsiveSVGSize(60, windowWidth);
  const largeCircleSize = getResponsiveSVGSize(500, windowWidth);

  // SVG positions calculation (more responsive)
  const getResponsivePosition = (position, windowWidth) => {
    // Adjust position based on screen size
    const scale = windowWidth < 640 ? 0.5 : 
                 windowWidth < 1024 ? 0.7 : 1;
    
    return position * scale;
  };
const handleOrderClick = () => {
    const calculatorElement = document.getElementById('price-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (

    <>
      <section className="hero flex-wrap flex justify-center mb-16 flex-col mt-[50px] items-center 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row font-[Manrope]">
        <div className="hero-left">
          <div className="max-w-2xl leading-[60px]">
            <img src="/zigzag.svg" alt="" />
            <p className="text-5xl font-extrabold text-[#212121] dark:text-[#014DF5]">Услуги грузчиков в <br /> городе Екатеринбурге</p>
          </div>
          <div className="mt-16">
            <p className="font-medium font-[#5A5A5A] dark:font-[#fff] text-2xl">
              Услуги грузчиков в городе Екатеринбурге <br />
              Рассчитать стоимость
            </p>
            <img className="ml-52" src="/arrow.svg" alt="" />
            <div className="buttons">
              <button onClick={() => setShowModals(true)} className="cursor-pointer px-8 font-[#fff] dark:font-[#fff] py-3 rounded-2xl bg-[#014DF5]">Оставить заявку</button>
              <button onClick={()=> handleOrderClick()} className="cursor-pointer border-2 font-[#fff] dark:font-[#fff] border-[#014DF5] bg-transparent px-8 py-3 rounded-2xl">Калькулятор</button>
            </div>
          </div>
        </div>
        <div className="hero-right hidden lg:flex  justify-center items-center">
          <div className="relative">
            <img
              ref={imgRef}
              className="relative z-10 mx-auto max-1000:mt-96"
              src="/hero-img.png"
              alt="Hero"
            />
            <div className="absolute inset-0 z-0">
              {/* Responsive SVG element 1 */}
              <div
                className="absolute top-[50%] left-[10%] transform -translate-x-1/2 -translate-y-1/2 sm:top-[500px] md:left-[10%]"
                style={{ 
                  width: `${smallCircleSize}px`, 
                  height: `${smallCircleSize}px`,
                  top: `${getResponsivePosition(500, windowWidth)}px`
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#58d8ff" />
                      <stop offset="100%" stopColor="#a58dff" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#circleGradient1)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251.32"
                    strokeDashoffset="251.32"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="251.32"
                      to="0"
                      dur="2s"
                      fill="freeze"
                      begin="0s"
                    />
                  </circle>
                </svg>
              </div>
              {/* Responsive SVG element 2 */}
              <div
                className="absolute top-[10%] right-[10%] transform -translate-x-1/2 sm:top-[100px] md:right-[10%]"
                style={{ 
                  width: `${mediumCircleSize}px`, 
                  height: `${mediumCircleSize}px`,
                  top: `${getResponsivePosition(100, windowWidth)}px`,
                  left: `${windowWidth < 768 ? '80%' : '90%'}`
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#58d8ff" />
                      <stop offset="100%" stopColor="#a58dff" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#circleGradient2)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251.32"
                    strokeDashoffset="251.32"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="251.32"
                      to="0"
                      dur="2s"
                      fill="freeze"
                      begin="0s"
                    />
                  </circle>
                </svg>
              </div>
              {/* Responsive SVG element 3 */}
              <div
                className="absolute top-[10%] left-1/2 transform -translate-x-1/2 sm:top-[100px]"
                style={{ 
                  width: `${largeCircleSize}px`, 
                  height: `${largeCircleSize}px`,
                  top: `${getResponsivePosition(100, windowWidth)}px`
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#58d8ff" />
                      <stop offset="100%" stopColor="#a58dff" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#circleGradient3)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="251.32"
                    strokeDashoffset="251.32"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="251.32"
                      to="0"
                      dur="2s"
                      fill="freeze"
                      begin="0s"
                    />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showModals && (
        <ModalsWrapper onClose={() => setShowModals(false)} isDarkMode={isDarkMode} />
      )}
    </>
  );
};

export default Hero;