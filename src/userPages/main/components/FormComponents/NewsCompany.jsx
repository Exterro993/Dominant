import React from "react";
import { Link } from "react-router";

const NewsCompany = () => {
  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${today.getFullYear()}`;
  const views = Math.floor(Math.random() * 1000) + 100;
  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-8 mb-16 md:mb-32 font-[Manrope] flex justify-center items-center">
        <div className="flex items-center justify-center gap-[130px]">
          <div>
            <img src="/zigzag.svg" alt="" />
            <h4 className="font-extrabold text-5xl pt-2.5 pb-10">
              Новости <br />
              компании
            </h4>
            <Link to="/news" className="cursor-pointer text-[#FFF] px-16 py-3 bg-[#014DF5] rounded-[10px]">
              Читать все
            </Link>
          </div>
          <div className="flex items-center justify-center flex-wrap">

          
          <div className="rounded-lg overflow-hidden w-[360px] font-[Manrope] p-4">
            <div className="relative">
              <img src="https://ik.imagekit.io/l1q0yhfbyy/Dominant/newsimg.png?updatedAt=1747647796367" className="w-full rounded-2xl h-full" alt="newsImg" />
              <div className="absolute  bg-white/70 top-[190px] text-[#014DF5]  rounded text-sm">
                {date}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                Такелажные перевозки. Погрузка со стропами
              </h3>
              <p className="text-gray-600 text-sm">
                Разбираем, собираем мебель. Укажите данную услугу при
                составлении заявки и грузчики ...
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {views}
              </div>
              <Link to="/news" className="text-[#014DF5] underline cursor-pointer">Читать далее </Link>
            </div>
          </div>
          <div></div>
          <div className="rounded-lg overflow-hidden w-[360px]  font-[Manrope] p-4">
            <div className="relative">
              <img src="https://ik.imagekit.io/l1q0yhfbyy/Dominant/newsimg.png?updatedAt=1747647796367" className="w-full h-full" alt="newsImg" />
              <div className="absolute  bg-white/70 top-[190px] text-[#014DF5]  rounded text-sm">
                {date}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                Такелажные перевозки. Погрузка со стропами
              </h3>
              <p className="text-gray-600 text-sm">
                Разбираем, собираем мебель. Укажите данную услугу при
                составлении заявки и грузчики ...
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {views}
              </div>
              <Link to="/news" className="text-[#014DF5] underline cursor-pointer">Читать далее </Link>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsCompany;
