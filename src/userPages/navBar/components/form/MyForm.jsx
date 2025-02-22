import React, { useState } from "react";

const MyForm = ({ handleFirstConfirm }) => {
  const [phoneNumber, setPhoneNumber] = useState("+7 ");
  const [error, setError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const isPhoneValid =
    phoneNumber.trim().length >= 10 && phoneNumber.startsWith("+7");
  const isDisabled = !isPhoneValid || !isAgreed;

  const handleInputChange = (e) => {
    if (!e.target.value.startsWith("+7")) {
      setPhoneNumber("+7 ");
    } else {
      setPhoneNumber(e.target.value);
    }
    setError("");
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      setError(
        "Введите корректный номер телефона (не менее 10 символов, начиная с +7)."
      );
      return;
    }
    if (!isAgreed) {
      setError("Необходимо согласиться с политикой конфиденциальности.");
      return;
    }
    handleFirstConfirm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[var(--bg-light)] text-[var(--text-light)] rounded-lg shadow-md p-6 "
    >
      <div className="mb-4">
        <div className="flex items-center justify-between bg-[var(--bg-light)] border-2 border-[#777777] rounded-md py-3 px-4">
          <input
            type="tel"
            placeholder="+7 9xxx xxx xx xx"
            value={phoneNumber}
            onChange={handleInputChange}
            className="placeholder-[#014DF5]  focus:outline-none w-full rounded"
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
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
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
        disabled={isDisabled}
        className={`w-full text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors ${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        Оставить заявку
      </button>
    </form>
  );
};

export default MyForm;
