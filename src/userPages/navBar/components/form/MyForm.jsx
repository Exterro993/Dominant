import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyForm = ({ handleFirstConfirm = () => {}, isModal }) => {
  const [phoneNumber, setPhoneNumber] = useState("+7 ");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleInputChange = (e) => {
    if (!e.target.value.startsWith("+7")) {
      setPhoneNumber("+7 ");
    } else {
      setPhoneNumber(e.target.value);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const showToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      
      if (/[a-zA-Z]/.test(phoneNumber)) {
        showToast("Номер не должен содержать буквы.");
        return;
      }
      if (/[^+\d\s]/.test(phoneNumber)) {
        showToast("Номер не должен содержать специальные символы.");
        return;
      }
      if (digitsOnly.length < 11) {
        showToast("Номер должен содержать 11 цифр.");
        return;
      }
      if (digitsOnly.length > 11) {
        showToast("Номер не должен содержать более 11 цифр.");
        return;
      }
      if (!phoneNumber.startsWith("+7")) {
        showToast("Номер должен начинаться с +7.");
        return;
      }
      if (isModal && !isAgreed) {
        showToast("Необходимо согласиться с политикой конфиденциальности.");
        return;
      }
      
      handleFirstConfirm(phoneNumber);
    } catch (error) {
      console.error("Ошибка при обработке формы:", error);
      showToast("Произошла ошибка. Попробуйте ещё раз.");
    }
  };

  return (
    <>
      {isModal ? (
        <div>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-[var(--bg-light)] text-[var(--text-light)] rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between bg-[var(--bg-light)] border-2 border-[#777777] rounded-md py-3 px-4">
                <input
                  type="tel"
                  placeholder="+7 9xxx xxx xx xx"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  className="placeholder-[#014DF5] focus:outline-none w-full rounded bg-transparent"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                id="privacy"
                className="mt-1 mr-2"
                checked={isAgreed}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="privacy" className="text-gray-600 text-sm">
                Отправляя форму, вы соглашаетесь с обработкой персональных данных и
                политикой конфиденциальности
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors bg-blue-500 hover:bg-blue-700"
            >
              Оставить заявку
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="tel"
              placeholder="+7 9xxx xxx xx xx"
              value={phoneNumber}
              onChange={handleInputChange}
              className="placeholder-[#014DF5] border border-white px-4 py-3 focus:outline-none w-full rounded text-white bg-transparent"
            />
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-md hover:bg-gray-100 cursor-pointer h-10 sm:h-12"
            >
              Рассчитать
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MyForm;