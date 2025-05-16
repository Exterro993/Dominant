import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ContactForm from "./FormComponents/ContactForm";

const Consultation = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const validatePhoneNumber = (phone) => {
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
        <div className="max-w-6xl w-full  font-[Manrope] flex justify-center items-center gap-4 sm:gap-6 bg-[#014DF5] rounded-lg p-[70px] sm:p-6">
          <div>
            <div className="relative">
              <p className="font-extrabold text-[40px] max-lg:text-[20px] pb-4 text-[#FFF]">
                Получить консультацию
              </p>
              <br />
              <img
                className="absolute top-14 bottom-8 max-lg:hidden"
                color="#FFF"
                src="/zigzag2.svg"
                alt=""
              />
            </div>
            <p className="text-2xl max-lg:text-[12px] font-semibold pb-6 text-[#FFF]">
            Закажите бесплатную консультацию на сайте или позвоните нам прямо сейчас. Мы ответим на все ваши вопросы и предложим выгодную цену.
            </p>
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

export default Consultation;
