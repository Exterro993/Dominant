import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import { GetData } from "../../../fetchers/CRUD";
import { pricesUrl } from "../../../fetchers/URL_SERVER";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSelectedService } from "../../store/serviceSlice";

import { Link } from "react-router-dom";
import ModalsWrapper from "../navBar/components/modals/ModalsWrapper";

const Footer = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetData(pricesUrl, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      setServices(data.prices || data);
    } else {
      console.error("Ошибка загрузки данных:", status);
      setError(`Ошибка загрузки данных: ${status}`);
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const links = [
    { to: "/about", label: "О компании" },
    { to: "/AutoPark", label: "Автопарк" },
    { to: "/contacts", label: "Контакты" },
    { to: "/vacancies", label: "Вакансии" },
    { to: "/news", label: "Новости" },
  ];
  const [showModals, setShowModals] = useState(false);

  const paymentMethods = [
    "Наличный",
    "Безналичный с НДС",
    "Безналичный без НДС",
  ];

  const dispatch = useDispatch();

  const handleOrderClick = (service) => {
    dispatch(setSelectedService(service));
    const calculatorElement = document.getElementById("price-calculator");
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Split services into two arrays for second and third columns
  const servicesColumn1 = services.slice(0, 5);
  const servicesColumn2 = services.slice(5, 10);

  return (
    <section className="font-[Manrope]">
      <footer className=" p-6">
        <div className="max-w-6xl mx-auto flex justify-between">
          {/* Left column - Company info */}
          <div className="flex flex-col space-y-4">
            <div className="mb-4">
              <Link to="/">
                <img src="/logo.svg" alt="logo" />
              </Link>
            </div>

            <div className="flex items-center">
              <Phone className="h-4 w-4 text-blue-700 mr-2" />
              <span className="font-extrabold">8 800 000 00 00</span>
            </div>

            <div className="flex items-center">
              <Mail className="h-4 w-4 text-blue-700 mr-2" />
              <span className="font-semibold">info@dominant24.ru</span>
            </div>

            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-blue-700 mr-2" />
              <span className="font-semibold">Оставить отзыв</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 text-blue-700 mr-2" />
              <span className="font-semibold">Работаем круглосуточно</span>
            </div>

            <div className="flex items-center gap-2.5">
              <p className="font-semibold">Напишите нам: </p>
              <img className="w-6" src="/Telegram.svg" alt="Telegram" />
              <img className="w-6" src="/Whatsapp.svg" alt="Whatsapp" />
            </div>

            <button
              onClick={() => setShowModals(true)}
              className="bg-[#014DF5] px-5 py-2 rounded-lg text-white max-[1024px]:hidden hover:shadow-[4px_4px_8px_13px_rgba(21,93,252,0.2)] cursor-pointer ease-out duration-500"
            >
              Заказать звонок
            </button>
          </div>

          {/* Middle section */}
          <div className="mx-8">
            <h2 className="text-blue-600 font-bold text-xl mb-4">УСЛУГИ</h2>

            <div className="grid grid-cols-3 gap-x-12 gap-y-2">
              {/* First column */}
              <div className="flex flex-col space-y-2">
                <ul>
                  {links.map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        to={link.to}
                        className="text-blue-800 hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Second column - First half of services */}
              <div className="flex flex-col space-y-2">
                {servicesColumn1.map((item, index) => (
                  <button
                    className="cursor-pointer text-left"
                    key={index}
                    onClick={() => handleOrderClick(item.service)}
                  >
                    <p className="text-gray-800 hover:text-blue-600 dark:text-[#FFF]">
                      {item.service}
                    </p>
                  </button>
                ))}
              </div>

              {/* Third column - Second half of services */}
              <div className="flex flex-col space-y-2">
                {servicesColumn2.map((item, index) => (
                  <button
                    className="cursor-pointer text-left"
                    key={index}
                    onClick={() => handleOrderClick(item.service)}
                  >
                    <p className="text-gray-800 hover:text-blue-600 dark:text-[#FFF]">
                      {item.service}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Payment methods */}
          <div>
            <h2 className="text-blue-600 font-bold text-xl mb-4">
              СПОСОБЫ ОПЛАТЫ:
            </h2>

            <div className="flex flex-col space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="text-gray-800 dark:text-[#FFF]">
                  {method}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-gray-800 dark:text-[#FFF] mb-2">
                Мы в соцсетях:
              </p>
              <div className="flex space-x-2">
                <Instagram className="h-6 w-6 text-gray-600" />
                <Youtube className="h-6 w-6 text-gray-600" />
                <span className="w-6 h-6 flex items-center justify-center text-gray-600">
                  VK
                </span>
                <Facebook className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {showModals && <ModalsWrapper onClose={() => setShowModals(false)} />}
      </footer>
    </section>
  );
};

export default Footer;
