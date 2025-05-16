import React, { useEffect, useState } from "react";
import { GetData } from "../../../fetchers/CRUD";
import { FullpricesUrl } from "../../../fetchers/URL_SERVER";
import { Link } from "react-router";

const Labourers = () => {
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    GetData(FullpricesUrl, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      setPrices(data);
    } else {
      console.error("Ошибка загрузки данных:", status);
    }
  };
  return (
    <>
      <section className="flex justify-center items-center flex-wrap gap-8  p-4 font-[Manrope]">
        {prices.map((item, index) => (
          <Link key={index} to={`/labourers/${item.id}`}>
            <div
              className=" w-80 h-80 flex flex-col justify-center items-center border-1 border-gray-500 p-2 rounded-lg shadow-md mb-4"
            >
              <img width={"170px"} src={item.img} alt="" />
              <h1 className="text-center text-4xl">{item.service}</h1>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Labourers;
