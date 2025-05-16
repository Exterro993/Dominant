import React, { useEffect, useState } from "react";
import { pricesUrl } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
import RotateLoader from 'react-spinners/RotateLoader';
import { useDispatch } from "react-redux";
// Импорт иконок
import { 
  Truck, 
  PackageOpen, 
  Users, 
  Construction, 
  Package, 
  Forklift, 
  ClipboardCheck, 
  User, 
  Building, 
  Hammer 
} from 'lucide-react';
import { setSelectedService } from "../../../store/serviceSlice";

const Services = () => {
  const [services, setServices] = useState(null);
  const dispatch = useDispatch();
  
  const handleOrderClick = (service) => {
    dispatch(setSelectedService(service));
    const calculatorElement = document.getElementById('price-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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

  const getIconForService = (serviceName) => {
    const iconProps = { size: 36, className: "text-[#014DF5] group-hover:text-white mb-2" };
    
    if (serviceName.includes("Грузчики для переезда")) return <Users {...iconProps} />;
    if (serviceName.includes("Грузчик")) return <User {...iconProps} />;
    if (serviceName.includes("3 грузчика + ГАЗель")) return <Truck {...iconProps} />;
    if (serviceName.includes("Грузчики-такелажники")) return <Forklift {...iconProps} />;
    if (serviceName.includes("Грузчик-сборщик мебели")) return <Construction {...iconProps} />;
    if (serviceName.includes("Разгрузка стройматериалов")) return <PackageOpen {...iconProps} />;
    if (serviceName.includes("Разнорабочие")) return <Hammer {...iconProps} />;
    if (serviceName.includes("Грузоперевозки")) return <Truck {...iconProps} />;
    if (serviceName.includes("Упаковщик")) return <Package {...iconProps} />;
    if (serviceName.includes("Экспедитор")) return <ClipboardCheck {...iconProps} />;
    if (serviceName.includes("для юридических лиц")) return <Building {...iconProps} />;
    
    return <Users {...iconProps} />;
  };
  
  return (
    <section className="font-[Manrope] transition-colors mx-auto">
      <h1 className="text-center text-[46px] mb-2.5 font-extrabold">
        Услуги
      </h1>
      <img src="/zigzag.svg" alt="" className="block mx-auto mb-8" />
      
      <div className="flex gap-[30px] flex-wrap justify-center">
        {services ? services.map((service, index) => (
          <div 
            key={index} 
            onClick={() => handleOrderClick(service.service)}
            className="group p-6 bg-[#F4F6F8] dark:bg-[#3a3e42] rounded-2xl w-80 h-[300px] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg cursor-pointer hover:bg-gradient-to-r from-[#28C1D6] to-[#014DF5] hover:text-white"
          >
            <div className="flex flex-col items-center">
              {getIconForService(service.service)}
              {/* <img src="/zigzag.svg" alt="" className="w-16 h-6 mb-3" /> */}
            </div>
            
            <div className="flex flex-col flex-grow font-[Manrope]">
              <p className="text-center font-bold text-lg mb-2">{service.service}</p>
              <p className="text-center text-sm mb-auto">{service.description}</p>
            </div>
            
            <button className="cursor-pointer text-center py-2 px-5 bg-[#014DF5] group-hover:bg-white group-hover:text-[#014DF5] text-white rounded-md w-full mt-4 transition-colors font-medium">
              от {service.price_with_discount} &#8381;
            </button>
          </div>
        )) : (
          <div className="flex justify-center w-full py-20">
            <RotateLoader color="#014DF5" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;