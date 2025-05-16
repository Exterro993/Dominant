import React, { useEffect, useRef } from "react";
import anime from "animejs";

const PopupWindow = ({ isOpen, onClose, isDarkMode }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: popupRef.current,
        translateY: [-window.innerHeight, 0],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutElastic(1, 1)",
        delay: 100,
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    anime({
      targets: popupRef.current,
      translateY: -window.innerHeight,
      opacity: 0,
      duration: 500,
      easing: "easeInQuad",
      complete: onClose,
    });
  };

  return (
    <div
      className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          filter: "blur(8px)",
          backdropFilter: "blur(8px)",
        }}
      ></div>
      <img src="/public/" alt="" />
      <div
        ref={popupRef}
        className="bg-[#fff] dark:bg-[#212121] rounded-lg p-8 shadow-2xl transform relative z-40 "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-center mb-4 text-[#014DF5]">Связаться со мной</h2>
        <img src="/public/qr.png" alt="QR код" />
        <button
          onClick={handleClose}
          className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-10 ml-[35%]"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default PopupWindow;
