import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faClock,
  faDolly,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

function OptionSelector({ value, setValue, iconName, label }) {
  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(Math.max(1, value - 1));
  };

  // Map icon name to the actual icon
  const getIcon = () => {
    switch(iconName) {
      case 'faClock':
        return faClock;
      case 'faDolly':
        return faDolly;
      case 'faBuilding':
        return faBuilding;
      default:
        return faClock;
    }
  };

  return (
    <div className="w-full">
      <label className="block text-white text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="flex items-center justify-between bg-white rounded-md py-2 px-3 sm:px-4 h-12">
        <FontAwesomeIcon icon={getIcon()} className="text-blue-500 mr-1 sm:mr-2" />
        <span className="text-black text-base sm:text-lg">{value}</span>
        <div className="flex flex-col ml-1 sm:ml-2 text-blue-500">
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Увеличить"
            className="hover:text-blue-700 focus:outline-none cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Уменьшить"
            className="hover:text-blue-700 focus:outline-none cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptionSelector;