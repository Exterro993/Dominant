import React, { useEffect, useState } from "react";
import { GetData, PostData } from "../../../../fetchers/CRUD";
import { autopark_URL } from "../../../../fetchers/URL_SERVER";

const AutoparkCards = () => {
  const [autopark, setautopark] = useState([]);
  
  useEffect(() => {
    GetData(autopark_URL, handleData);
  }, []);
  
  const handleData = (data, status) => {
    if (status === 200) {  // Fixed condition with double equals
      setautopark(data);
      console.log("Ураа");
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-20 mx-auto px-4">
        {autopark.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-center text-black bg-gray-100 dark:bg-white p-2 rounded-2xl w-full max-w-xs mx-auto">
            <img src={item.img} alt={item.name} className="w-full h-auto object-contain" />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold pb-2 md:pb-4">{item.name}</h1>
            <p className="text-blue-600 pb-2 md:pb-4 text-center">{item.price}</p>
            <ul className="text-gray-600 pb-2 md:pb-4 text-sm md:text-base w-full">
              <li>Грузоподъемность {item.specifications.loadCapacity}</li>
              <li>Длина {item.specifications.length}</li>
              <li>Высота {item.specifications.height}</li>
            </ul>
            <button className="bg-blue-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-2xl cursor-pointer text-sm md:text-base w-full md:w-auto">
              Заказать машину
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AutoparkCards;