import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import ContactFeedback from "./components/ContactFeedback";
const Contacts = () => {
  return (
    <>
      <section className="max-w-6xl flex-col font-[Manrope] mx-auto flex justify-between ">
        <img src="zigzag.svg" className="w-[84px]" alt="" />
        <h1 className="text-5xl font-extrabold pb-[15px]">КОНТАКТЫ</h1>
        <p className="text-[#5A5A5A] pb-9">
          Наши менеджеры проконсультируют вас по всем вопросам и предложат самую
          выгодную цену услуги. Звоните нам в любое <br /> время или оставьте
          заявку на сайте, заполнив форму обратной связи. Мы свяжемся с вами для
          консультации в течение минуты.
        </p>
        <div className="flex justify-between mb-10">
          <div className="flex gap-2.5 items-center">
            <FaPhoneAlt color="#014DF5" />
            +7 (995) 999-50-38
          </div>
          <div className="flex gap-2.5 items-center">
            <FiMail color="#014DF5" />
            info@dominant24.ru
          </div>
          <div className="flex gap-2.5 items-center">
            <FaRegClock color="#014DF5" />
            Круглосуточно и без выходных
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29896463.19646516!2d96.851268564066!3d62.7838913010767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1744729076072!5m2!1sru!2s"
          width="1127"
          height="390"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <ContactFeedback/>
      </section>
    </>
  );
};

export default Contacts;
