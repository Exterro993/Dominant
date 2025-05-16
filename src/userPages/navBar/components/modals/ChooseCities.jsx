import React, { useEffect, useRef, useState } from "react";
import { GetData } from "../../../../../fetchers/CRUD";
import { cities_URL } from "../../../../../fetchers/URL_SERVER";
import { RxCross2 } from "react-icons/rx";
import RotateLoader from "react-spinners/RotateLoader";
import anime from "animejs";

const ChooseCities = ({ isOpen, onClose, isDarkMode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const popupRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen && popupRef.current) {
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
    if (popupRef.current) {
      anime({
        targets: popupRef.current,
        translateY: -window.innerHeight,
        opacity: 0,
        duration: 500,
        easing: "easeInQuad",
        complete: onClose,
      });
    } else {
      onClose();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    GetData(cities_URL, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      // console.log(data);
      setCities(data);
    } else {
      console.error("Ошибка загрузки данных:", status);
    }
    setTimeout(() => {
      
      setIsLoading(false);
    }, 1000);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  const SaveToStorage = (city) =>{
    localStorage.setItem('city',city)
  }
  return (
    <>
    {
      isLoading ? (<div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"><div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          filter: "blur(8px)",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      ></div><RotateLoader color="#014DF5" /></div> ) : (<div
        className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            filter: "blur(8px)",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        <div
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          className="transition-colors bg-[#FFFFFF] dark:bg-[#212121] bg-[url('/background.png')] bg-no-repeat bg-left   duration-500 p-8 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <h1 className="text-2xl font-bold text-[#014DF5] mb-6 text-center">ВЫБОР ГОРОДА</h1>
          <input
            type="text"
            placeholder="или введите название города"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 "
          />

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredCities.map((el) => (
              <li key={el.id} className="text-[#5A5A5A] hover:text-[#014DF5]">
                <button onClick={()=>{SaveToStorage(el.name);handleClose()}} className="cursor-pointer font-semibold text-[#5A5A5A] text-lg w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-[#014DF5] dark:text-[#FFF] rounded">
                  {el.name}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="absolute top-4 right-4 cursor-pointer p-2 hover:bg-gray-100 rounded-full"
            onClick={handleClose}
          >
            <RxCross2 size={24} color="black" />
          </button>
        </div>
      </div>)
    }
      
    </>
  );
};

export default ChooseCities;
