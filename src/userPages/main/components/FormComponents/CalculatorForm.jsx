import React from 'react';

function CalculatorForm({ hasElevator, setHasElevator, needCar, setNeedCar }) {
  const renderRadioGroup = (label, value, setValue, trueLabel, falseLabel) => {
    return (
      <div className="w-full">
        <label className="block text-white text-sm font-semibold mb-2">
          {label}
        </label>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="true"
              checked={value === true}
              onChange={() => setValue(true)}
              className="form-radio h-4 w-4 text-blue-500 mr-1 sm:mr-2"
            />
            <span className="text-white text-sm sm:text-base">{trueLabel}</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="false"
              checked={value === false}
              onChange={() => setValue(false)}
              className="form-radio h-4 w-4 text-blue-500 mr-1 sm:mr-2"
            />
            <span className="text-white text-sm sm:text-base">{falseLabel}</span>
          </label>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderRadioGroup("Наличие лифта:", hasElevator, setHasElevator, "Есть", "Нет")}
      {renderRadioGroup("Нужен автомобиль:", needCar, setNeedCar, "Да", "Нет")}
    </>
  );
}

export default CalculatorForm;