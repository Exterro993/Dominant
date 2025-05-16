import React from 'react';

function ServiceSelector({ services, selectedService, handleServiceChange }) {
  return (
    <div className="w-full">
      <label className="block text-white text-sm font-semibold mb-2" htmlFor="selectedService">
        Услуга:
      </label>
      <div className="bg-white rounded-md h-12">
        <select
          id="selectedService"
          value={selectedService || ""}
          onChange={handleServiceChange}
          className="w-full h-full py-2 px-3 sm:px-4 rounded-md focus:outline-none appearance-none text-[#5A5A5A] text-sm sm:text-base"
        >
          <option value="">Выбрать из списка</option>
          {services ? (
            services.map((service) => (
              <option className='hover:text-[#014DF5]' key={service.service} value={service.service}>
                {service.service}
              </option>
            ))
          ) : (
            <option value="" disabled>Загрузка услуг...</option>
          )}
        </select>
      </div>
    </div>
  );
}

export default ServiceSelector;