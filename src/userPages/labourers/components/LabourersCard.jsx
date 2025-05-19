import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FullpricesUrl } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
import ModalsWrapper from "../../navBar/components/modals/ModalsWrapper";

const LabourersCard = () => {
  const [currentService, setcurrentService] = useState({});
  const { id } = useParams();
  const city = localStorage.getItem("city");
  const [showModals, setShowModals] = useState(false);

  const handleOrderClick = () => {
    const calculatorElement = document.getElementById("price-calculator");
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleData = (data, status) => {
    if (status === 200) {
      setcurrentService((el) => ({
        ...el,
        ...data.find((item) => item.id === id),
      }));
    } else {
      console.error("Ошибка загрузки данных:", status);
    }
  };
  useEffect(() => {
    GetData(FullpricesUrl, handleData);
  }, []);

  return (
    <>
      <section className="card mt-9 font-[Manrope] transition-colors mx-auto w-1/2 mb-32 flex justify-center items-center max-2xl:flex-wrap max-lg:w-auto">
        <div className="flex justify-center items-center max-[1024px]:flex-wrap gap-12">
          <div className="card-left">
            <img
              src="https://ik.imagekit.io/l1q0yhfbyy/Dominant/zigzag.svg?updatedAt=1747649941716"
              alt=""
            />
            <h1 className="uppercase font-extrabold text-5xl">
              {currentService?.service} в {city}е
            </h1>
            <p className="pt-5 pb-5 text-[#5A5A5A]">
              Рассчитать стоимость переезда с грузчиками в {city}е
            </p>
            <button
              onClick={() => setShowModals(true)}
              className="cursor-pointer px-8 py-3 font-[#fff] dark:font-[#fff]  rounded-2xl bg-[#014DF5]"
            >
              Оставить заявку
            </button>
            <button
              onClick={() => handleOrderClick()}
              className="cursor-pointer border-2 font-[#fff] dark:font-[#fff] border-[#014DF5] bg-transparent px-8 py-3 rounded-2xl"
            >
              Калькулятор
            </button>
          </div>
          <div className="card-right">
            <img width={600} src={currentService.img} alt="" />
          </div>
        </div>
      </section>
      {showModals && <ModalsWrapper onClose={() => setShowModals(false)} />}
    </>
  );
};

export default LabourersCard;
