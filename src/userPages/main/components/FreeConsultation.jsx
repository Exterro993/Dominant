import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ContactForm from "./FormComponents/ContactForm";

const FreeConsultation = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const validatePhoneNumber = (phone) => {
    // Simple validation for Russian phone numbers
    const phoneRegex = /^\+7\s?9\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreedToTerms) {
      toast.warning("Необходимо согласиться с обработкой персональных данных", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(
        "Введите корректный номер телефона в формате +7 9XX XXX XX XX",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      return;
    }

    toast.success("Мы свяжемся с вами в ближайшее время!", {
      position: "top-right",
      autoClose: 5000,
    });

    console.log("Форма потверждена");
  };

  return (
    <>
    <section className="flex justify-center items-center mb-32">
      <ToastContainer />
      <div className="max-w-6xl w-full  font-[Manrope] flex justify-center items-center gap-4 sm:gap-6 bg-[#014DF5] rounded-lg p-3 sm:p-6">
        <div>
          <div className="relative">
          <p className="font-extrabold text-[40px] max-lg:text-[20px] pb-4 text-[#FFF]">
            Бесплатная консультация <br />ЗА 30 СЕКУНД
          </p>
             <img className="absolute left-75 bottom-8 max-lg:hidden" color="#FFF" src="/zigzag2.svg" alt="" />
          </div>
          <p className="text-2xl max-lg:text-[12px] font-semibold pb-6 text-[#FFF]">Позвоните нам прямо сейчас и мы ответим на все Ваши вопросы</p>
          <div className="flex">
            <img src="/phone.svg" alt="" /> <p className="font-extrabold text-3xl max-lg:text-[10px] text-[#FFF]">+7 (995) 999-50-38</p>{" "}
          </div>
        </div>
        <div>
          <ContactForm
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
          />
        </div>
      </div>
      </section>
    </>
  );
};

export default FreeConsultation;
