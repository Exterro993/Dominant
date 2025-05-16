import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { GetData } from '../../../../fetchers/CRUD';
import { pricesUrl } from "../../../../fetchers/URL_SERVER";

const ServicePriceList = ({ title }) => {
  const [expandedSection, setExpandedSection] = useState("Квартирный переезд");
  const [prices, setPrices] = useState([])
useEffect(() => {
    GetData(pricesUrl, handleData);
  }, []);
  const handleData = (data, status) => {
    if (status === 200) {
      setPrices(data);
      
    } else {
      console.error('Ошибка загрузки данных:', status);
      setError(`Ошибка загрузки данных: ${status}`);
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000
      });
    }
  };

  const apartmentServices = [
    { id: 1, name: "Переезд однокомнатной квартиры" },
    { id: 2, name: "Переезд двухкомнатной квартиры" },
    { id: 3, name: "Переезд трехкомнатной квартиры" }
  ];
  const displayedServices = [
    { id: 1, name: "Грузчики для переезда", price: 350, discountPrice: 250 },
    { id: 2, name: "3 грузчика+ ГАЗель", price: 350, discountPrice: 250 },
    { id: 3, name: "Грузчики-такелажники", price: 500, discountPrice: 400 },
    { id: 4, name: "Грузчик-сборщик мебели", price: 500, discountPrice: 400 },
    { id: 5, name: "Разгрузка стройматериалов", price: 400, discountPrice: 300 }
  ];

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
console.log(prices)
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-500">Главная</Link>
        <span className="mx-2">›</span>
        <Link to="/services" className="hover:text-blue-500">Услуги</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{title || "Переезд с грузчиками"}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Квартирный переезд</h2>
            <button 
              className="flex items-center justify-between w-full text-blue-600"
              onClick={() => toggleSection("Квартирный переезд")}
            >
              <span className="text-lg font-semibold">Квартирный переезд</span>
              <FiPlus className="bg-blue-600 text-white rounded-full p-1" size={24} />
            </button>
            
            {expandedSection === "Квартирный переезд" && (
              <div className="mt-2 ml-4 flex flex-col space-y-3">
                {apartmentServices.map(service => (
                  <Link key={service.id} to={`/services/${service.id}`} className="text-gray-700 hover:text-blue-600">
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <button 
              className="flex items-center justify-between w-full text-blue-600"
              onClick={() => toggleSection("Дачный переезд")}
            >
              <span className="text-lg font-semibold">Дачный переезд</span>
              <FiPlus className="bg-blue-500 text-white rounded-full p-1" size={24} />
            </button>
          </div>

          <div className="mb-8">
            <button 
              className="flex items-center justify-between w-full text-blue-600"
              onClick={() => toggleSection("Офисный переезд")}
            >
              <span className="text-lg font-semibold">Офисный переезд</span>
              <FiPlus className="bg-blue-600 text-white rounded-full p-1" size={24} />
            </button>
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <div className="rounded-lg shadow">
            <div className="grid grid-cols-3  p-4 rounded-t-lg">
              <div className="font-semibold">Услуга</div>
              <div className="font-semibold text-center">Цена без акции</div>
              <div className="font-semibold text-center">Цена по акции</div>
            </div>
            
            {displayedServices.map((service, index) => (
              <div 
                key={service.id} 
                className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? '' : 'bg-blue-600'}`}
              >
                <div>{service.name}</div>
                <div className="text-center text-gray-700">от {service.price} ₽</div>
                <div className="text-center text-blue-600 font-semibold">от {service.discountPrice} ₽</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePriceList;