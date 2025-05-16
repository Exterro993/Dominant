import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { X, Menu } from "lucide-react";
import { pricesUrl } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
import { useDispatch } from "react-redux";
import { setSelectedService } from "../../../store/serviceSlice";
import RotateLoader from "react-spinners/RotateLoader";
import { Link } from "react-router";

const BurgerMenu = ({ openPopup }, isMounted) => {
  const [services, setServices] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    GetData(pricesUrl, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      setServices(data);
    } else {
      console.error("Ошибка загрузки данных:", status);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const city = localStorage.getItem("city");
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleOrderClick = (service) => {
    dispatch(setSelectedService(service));
    const calculatorElement = document.getElementById("price-calculator");
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: menuRef.current,
        translateX: ["-100vw", "0vw"],
        duration: 500,
        easing: "easeOutQuad",
      });
    } else {
      anime({
        targets: menuRef.current,
        translateX: ["0vw", "-100vw"],
        duration: 400,
        easing: "easeInQuad",
      });
    }
  }, [isOpen]);
  const links = [
    { to: "/about", label: "О компании" },
    { to: "/AutoPark", label: "Автопарк" },
    { to: "/contacts", label: "Контакты" },
    { to: "/vacancies", label: "Вакансии" },
    { to: "/news", label: "Новости" },
  ];

  return (
    <>
      <button
        className={` ${
          isOpen ? "fixed" : "relative"
        } ease-out duration-500    z-50 text-white p-2 bg-blue-600 rounded-md lg:hidden cursor-pointer hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <div
        ref={menuRef}
        style={{ transform: "translateX(-100vw)" }}
        className="fixed z-40 top-0 left-0  bg-[#232f3f] h-full w-dvw  text-white shadow-lg"
      >
        <div className="p-5 flex flex-col gap-4 font-[Manrope]">
          <div className="logo">
            <img src="/logo.svg" alt="Logo" className="w-32" />
          </div>

          <p className="text-sm">
            Ваш город: <span className="text-blue-300"> {city} </span>
          </p>

          <div className="space-y-2">
            <p className="font-semibold">Услуги</p>
            <ul className="pl-4 text-sm space-y-1">
              {services ? (
                services.map((service, index) => (
                  <li key={index}>
                    <button
                      className="cursor-pointer hover:text-[#014DF5]"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        handleOrderClick(service.service);
                      }}
                    >
                      {service.service}
                    </button>
                  </li>
                ))
              ) : (
                <RotateLoader color="#014DF5" />
              )}
            </ul>
          </div>

          <ul>
            {links.map((link, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={link.to}
                  className="text-gray-800 hover:text-blue-600" 
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="font-semibold">Контакты</p>
            <p className="text-lg font-bold">8 800-321-56-78</p>
            <p className="text-sm">info@dominant24.ru</p>
          </div>
          <div className="icons flex  gap-3.5 pr-4">
            <button onClick={openPopup} className="cursor-pointer">
              <img className="" src="/Telegram.svg" alt="" />
            </button>

            <img className="" src="/Whatsapp.svg" alt="" />
          </div>

          <p className="text-xs mt-4 flex items-center gap-2">
            <span>📩</span> Работаем круглосуточно
          </p>
        </div>
      </div>
      {isMounted && <PopupWindow isOpen={isOpen} onClose={closePopup} />}
    </>
  );
};

export default BurgerMenu;
