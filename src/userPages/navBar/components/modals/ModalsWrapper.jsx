import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import MyForm from "../form/MyForm";

const Modal = ({ isOpen, onClose, children, showCloseButton = false, isDarkMode }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Анимация входа: прилёт сверху
      anime({
        targets: modalRef.current,
        translateY: ["-100%", "0%"],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 300,
      });
      // Анимация для фона
      anime({
        targets: backdropRef.current,
        opacity: [0, 1],
        easing: "linear",
        duration: 300,
      });
    } else if (shouldRender) {
      // Анимация выхода: уход вниз
      anime({
        targets: modalRef.current,
        translateY: ["0%", "100%"],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 300,
        complete: () => {
          setShouldRender(false);
        },
      });
      anime({
        targets: backdropRef.current,
        opacity: [1, 0],
        easing: "linear",
        duration: 300,
      });
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-transparent backdrop-blur-md"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={modalRef}
        // Используем CSS-переменные для фона и цвета текста.
        className="p-6 rounded-lg max-w-md w-full mx-4 shadow-lg relative z-10 bg-[var(--bg-light)] text-[var(--text-light)] bg-[url('/public/background.png')] bg-no-repeat bg-[0%_20%] bg-[length:360px_80px]"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0 }}
      >
        {showCloseButton && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

const ModalsWrapper = ({ onClose, isDarkMode }) => {
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const handleFirstConfirm = () => {
    setIsFirstOpen(false);
    setIsSecondOpen(true);
  };

  const handleSecondClose = () => {
    setIsSecondOpen(false);
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isFirstOpen} onClose={onClose} isDarkMode={isDarkMode}>
        <div className="space-y-4 ">
          <h2 className="text-3xl text-[#014DF5]">ОБРАТНАЯ СВЯЗЬ</h2>
          <p>
            Наш менеджер перезвонит в течении минуты и проконсультирует по всем
            вопросам
          </p>
          <MyForm handleFirstConfirm={handleFirstConfirm} />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isSecondOpen}
        onClose={handleSecondClose}
        showCloseButton
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#014DF5]">Ваша заявка успешно отправлена</h2>
          <p>
            Ожидайте звонка в течении минуты. Менеджер произведет Вам рассчет
            стоимости и оформит заявку.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalsWrapper;
