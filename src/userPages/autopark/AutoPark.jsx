import React from "react";
import AutoparkCards from "./components/AutoparkCards";
import PriceCalculator from "../main/components/PriceCalculator";

const AutoPark = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-32 mt-14 font-[Manrope]">
        <div className="flex items-center justify-center gap-10">
        <div className="container-left">
        <img src="zigzag.svg" alt="" />
        <h1 className="text-5xl font-extrabold pb-3 pt-2">АВТОПАРК</h1>
        <p className="text-[#5A5A5A] pb-6">Компания «Доминант» предлагает заказать <br /> грузовой транспорт в городе Екатеринбург, по <br /> низкой цене для переезда и прочих <br /> потребностей. </p>
        <div className="flex items-center gap-4">
        <button className="bg-[#014DF5] px-8 py-3 rounded-2xl cursor-pointer">Заказать машину</button>
        <div className="flex items-center gap-2">
        <p className="text-[#5A5A5A]">Напишите нам в вотсапп</p>
          <img src="/Whatsapp.svg" alt="" />
        </div>
        </div>
        </div>
        <div className="container-right">
          <img src="/autoparkImg.png" alt="" />
        </div>
        </div>
        <AutoparkCards/>
        <PriceCalculator/>
        
      </div>
    </>
  );
};

export default AutoPark;
