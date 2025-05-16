import React, { Children, useEffect, useState } from "react";
import BurgerMenu from "./components/BurgerMenu";
import PopupWindow from "./components/modals/PopupWindow";
import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import ModalsWrapper from "./components/modals/ModalsWrapper";

import ChooseCities from "./components/modals/ChooseCities";
import { Link } from "react-router";
import Footer from "../footer/Footer";

// http://localhost:5500/cities
const Nav = ({ children }) => {
  const [showModals, setShowModals] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const city = localStorage.getItem("city");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Переключатель темы
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMountedTwo, setIsMountedTwo] = useState(false);

  const openPopup = () => {
    setIsMounted(true);
    setIsOpen(true);
  };
  const openPopupTwo = () => {
    setIsMountedTwo(true);
    setIsOpenTwo(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setTimeout(() => setIsMounted(false), 500);
  };
  const closePopupTwo = () => {
    setIsOpenTwo(false);
    setTimeout(() => setIsMountedTwo(false), 500);
  };

  return (
    <>
      <div className="header mt-2.5 transition-colors duration-500">
        <div className="header-top flex justify-center items-center font-[Manrope] transition-colors duration-500">
          <div className="logo pr-4">
            <Link to="/">
              <img src="/logo.svg" alt="logo" />
            </Link>
          </div>
          <div className=" pr-4 pl-4 border-l-2 border-l-[#014DF5] max-[1024px]:hidden">
            Услуги грузчиков, <br />
            скидки, кэшбэк
          </div>
          <div className="pl-4 pr-4 border-l-2 border-l-[#014DF5] max-[1024px]:hidden">
            <p>
              {city} <br />
              <button className="cursor-pointer" onClick={openPopupTwo}>
                Выбрать город
              </button>
            </p>
          </div>
          <div className="pl-4 pr-4 border-l-2 border-l-[#014DF5]">
            <p>
              8 800-321-56-78
              <br />
              <span className=" max-[1024px]:hidden">
                Работаем круглосуточно, 24/7
              </span>
            </p>
          </div>
          <BurgerMenu openPopup={openPopup} isMounted={isMounted} />
          <div className="icons flex justify-center gap-3.5 pr-4 max-[1024px]:hidden">
            <button onClick={openPopup} className="cursor-pointer">
              <img src="/Telegram.svg" alt="Telegram" />
            </button>
            <img src="/Whatsapp.svg" alt="Whatsapp" />
          </div>
          <button
            onClick={() => setShowModals(true)}
            className="bg-[#014DF5] px-5 py-2 rounded-lg text-white max-[1024px]:hidden hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] cursor-pointer ease-out duration-500"
          >
            Заказать звонок
          </button>
          <button
            onClick={toggleTheme}
            className="ml-2.5 p-2 bg-[#014DF5] rounded-lg hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] cursor-pointer ease-out duration-500"
          >
            {isDarkMode ? (
              <MdDarkMode size={21} color="#fff" />
            ) : (
              <IoMdSunny size={21} color="#fff" />
            )}
          </button>
        </div>
      </div>
      {showModals && (
        <ModalsWrapper
          onClose={() => setShowModals(false)}
          isDarkMode={isDarkMode}
        />
      )}
      {isMounted && (
        <PopupWindow
          isOpen={isOpen}
          onClose={closePopup}
          isDarkMode={isDarkMode}
        />
      )}
      {isMountedTwo && (
        <ChooseCities
          isOpen={isOpenTwo}
          onClose={closePopupTwo}
          isMounted={isMountedTwo}
        />
      )}
      {children}
    </>
  );
};

export default Nav;
