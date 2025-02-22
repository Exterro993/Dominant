import React, { useState } from "react";
import BurgerMenu from "./components/BurgerMenu";
import PopupWindow from "./components/modals/PopupWindow";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import ModalsWrapper from "./components/modals/ModalsWrapper";
const Nav = () => {
  const [showModals, setShowModals] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
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
  return (
    <>
      <div className="header mt-2.5 ">
        <div className="header-top flex justify-center items-center font-[Manrope]">
          <div className="logo pr-4">
            <img src="/logo.svg" alt="logo" className="" />
          </div>
          <div className="text-[var(--text-light)] pr-4 pl-4 border-l-2 border-l-[#014DF5] max-[1024px]:hidden ">
            Услуги грузчиков, <br />
            скидки, кэшбэк
          </div>
          <div className="pl-4 pr-4 border-l-2 border-l-[#014DF5] max-[1024px]:hidden">
            <p className="text-[var(--text-light)]">
              ... <br />
              <span className="text-[var(--text-light)] ">Выбрать город</span>
            </p>
          </div>
          <div className="pl-4 pr-4 border-l-2 border-l-[#014DF5]">
            <p>
              8 800-321-56-78
              <br />
              <span className="text-[var(--text-light)] max-[1024px]:hidden">
                Работаем круглосуточно, 24/7
              </span>
            </p>
          </div>
          <BurgerMenu openPopup={openPopup} isMounted={isMounted}/>
          <div className="icons flex justify-center gap-3.5 pr-4 max-[1024px]:hidden">
            <button onClick={openPopup}>
              <img className="" src="/Telegram.svg" alt="" />
            </button>

            <img className="" src="/Whatsapp.svg" alt="" />
          </div>

          <button onClick={() => setShowModals(true)} className="bg-[#014DF5] px-5 py-2 rounded-lg text-[#FFFFFF] max-[1024px]:hidden hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] cursor-pointer ease-out duration-500">
            Заказать звонок
          </button>
          <button
            onClick={toggleTheme}
            className="ml-2.5 p-2 bg-[#014DF5] rounded-lg hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] cursor-pointer ease-out duration-500"
          >
            {isDarkMode ? <MdDarkMode size={21} color="#fff"/> : <IoMdSunny size={21} color="#fff" />}
          </button>
        </div>
      </div>
          {showModals && <ModalsWrapper onClose={() => setShowModals(false)} isDarkMode={isDarkMode}/>}
      {isMounted && <PopupWindow isOpen={isOpen} onClose={closePopup} isDarkMode={isDarkMode}/>}
    </>
  );
};

export default Nav;
