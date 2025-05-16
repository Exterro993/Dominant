import React from "react";

const AboutServices = () => {
  return (
    <>
      <section className="font-[Manrope] flex flex-col justify-center items-center">
        <div className="flex justify-center items-center flex-wrap">
          <div className="container-left">
            <h2 className="text-center text-4xl">Наши услуги:</h2>
            <ul className="text-[#014DF5]">
              <li>Квартирные и офисные переезды</li>
              <li>Погрузо-разгрузочные работы</li>
              <li>Подъём на этаж без лифта</li>
              <li>Уборка и вынос строительного мусора</li>Разборка и сборка
              мебели
              <li>Разборка и сборка мебели</li>
            </ul>
            <p className="text-[#5A5A5A] pt-9">
              Работаем прозрачно: без скрытых доплат, с чёткими условиями и <br />
              фиксированной стоимостью.
            </p>
          </div>
          <div className="container-right">
            <img src="heroImg2.png" alt="Hero" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutServices;
