import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pricesUrl } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
import { setSelectedService } from "..//../../store/serviceSlice"; // Update path as needed

const Prices = () => {
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

  const handleOrderClick = (service) => {
    dispatch(setSelectedService(service));
    const calculatorElement = document.getElementById('price-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  return (
    <>
    <section>

    
      <h1 className="text-2xl font-bold text-center mb-6">Цены</h1>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl p-10">
        {services ? (
          services.map((service, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full gap-2.5 p-4 rounded-lg shadow-sm"
            >
              <p className="text-[#050505] dark:text-[#fff] flex-1 text-[12px]">{service.service}</p>
              <span className="text-[#014DF5] font-medium min-w-[80px]">
                от {service.price_with_discount} &#8381;
              </span>
              <button
                className="cursor-pointer min-w-[100px] bg-transparent text-[#014DF5] border-2 border-[#014DF5] hover:bg-[#014DF5] hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg"
                onClick={() => handleOrderClick(service.service)}
              >
                Заказать
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            Загрузка услуг...
          </p>
        )}
      </div>
      </section>
    </>
  );
};

export default Prices;