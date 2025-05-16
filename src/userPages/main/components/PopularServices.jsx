import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
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
import { pricesUrl } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
const PopularServices = () => {
  
  const dispatch = useDispatch();
  
  const handleOrderClick = (service) => {
    dispatch(setSelectedService(service));
    const calculatorElement = document.getElementById('price-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const [services, setServices] = useState([])
 useEffect(() => {
    GetData(pricesUrl, handleData);
  }, []);
  const handleData = (data, status) => {
    if (status === 200) {
      setServices(data);
    } else {
      console.error('Ошибка загрузки данных:', status);
      setError(`Ошибка загрузки данных: ${status}`);
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000
      });
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
    <section className="w-full px-4 sm:px-6 md:px-8 mb-16 md:mb-32 font-[Manrope] flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold mb-6">Популярные услуги</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-6xl"
      >
        {services.map((service,index) => (
          <SwiperSlide key={service.id}>
            <div
             key={index} 
             onClick={() => handleOrderClick(service.service)} 
            className="p-8 shadow-lg rounded-xl flex flex-col items-center justify-center text-center h-[339px] w-[370px]">
              {getIconForService(service.service)}
              <h3 className="text-lg font-semibold mb-2">{service.service}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
                <button key={index} 
             onClick={() => handleOrderClick(service.service)}
              className="text-[#FFF] bg-[#014DF5] font-bold p-1.5 rounded-2xl cursor-pointer text-xl">{service.price_with_discount} ₽</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularServices;
