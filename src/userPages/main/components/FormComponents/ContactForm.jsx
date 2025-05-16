import React from 'react';

function ContactForm({ phoneNumber, setPhoneNumber, handleSubmit, agreedToTerms, setAgreedToTerms }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+7")) {
      setPhoneNumber("+7 ");
    } else {
      setPhoneNumber(value);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
        <div className="flex flex-col space-y-3 sm:space-y-4">
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
        </div>
      </form>

      <div className="text-white text-xs mt-2 sm:mt-4 flex items-start">
        <input 
          type="checkbox" 
          className="mr-2 mt-1" 
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
        />
        <span>
          Отправляя форму, вы соглашаетесь с обработкой персональных данных и политикой
          конфиденциальности
        </span>
      </div>
    </>
  );
}

export default ContactForm;