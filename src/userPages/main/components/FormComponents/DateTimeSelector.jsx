import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faCalendarAlt,
  faClock,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

function DateTimeSelector({ desiredDate, setDesiredDate, desiredTime, setDesiredTime, windowWidth }) {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDateDropdown(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setShowTimeDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const getNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay() || 7; // Adjust for Monday as first day of week
  };

  const getMonthName = (month) => {
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return monthNames[month - 1];
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1 || 12);
    
    const days = [];
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    // Add days from previous month
    for (let i = firstDay - 1; i > 0; i--) {
      days.push({
        day: prevMonthDays - i + 1,
        month: currentMonth === 1 ? 12 : currentMonth - 1,
        year: currentMonth === 1 ? currentYear - 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }
    
    // Add days from next month
    const nextMonthDays = 42 - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        day: i,
        month: currentMonth === 12 ? 1 : currentMonth + 1,
        year: currentMonth === 12 ? currentYear + 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    const formattedSelectedDate = desiredDate.split('.');
    const selectedDay = parseInt(formattedSelectedDate[0]);
    const selectedMonth = parseInt(formattedSelectedDate[1]);
    
    const calendarWidth = windowWidth < 640 ? windowWidth - 60 : "100%";
    
    // Check current date to highlight today
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonthNum = now.getMonth() + 1;
    const currentYearNum = now.getFullYear();
    
    return (
      <div className="bg-white rounded-md p-2 sm:p-4 w-full text-[#014DF5]" style={{ maxWidth: calendarWidth }}>
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <div className="text-sm sm:text-lg font-semibold">
            {getMonthName(currentMonth)} {currentYear}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={getPreviousMonth} 
              className="p-1 text-blue-500 hover:text-blue-700"
              aria-label="Предыдущий месяц"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button 
              onClick={getNextMonth} 
              className="p-1 text-blue-500 hover:text-blue-700"
              aria-label="Следующий месяц"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-xs sm:text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday = day.day === currentDay && 
                           day.month === currentMonthNum && 
                           day.year === currentYearNum;
            const isSelected = day.day === selectedDay && 
                              day.month === selectedMonth;
            let dayClass = 'text-center p-1 sm:p-2 cursor-pointer rounded-md text-xs sm:text-sm ';
            
            if (!day.isCurrentMonth) {
              dayClass += 'text-gray-400 ';
            } else if (isSelected) {
              dayClass += 'bg-blue-500 text-white ';
            } else if (isToday) {
              dayClass += 'bg-blue-100 font-bold ';
            } else {
              dayClass += 'hover:bg-gray-100 ';
            }
            
            return (
              <div
                key={index}
                className={dayClass}
                onClick={() => {
                  const formattedDay = day.day.toString().padStart(2, '0');
                  const formattedMonth = day.month.toString().padStart(2, '0');
                  setDesiredDate(`${formattedDay}.${formattedMonth}`);
                  setShowDateDropdown(false);
                }}
              >
                {day.day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeOptions = () => {
    const timeOptions = [
      '09:00', '09:30', '10:00', '10:30', 
      '11:00', '11:30', '12:00', '12:30',
      '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00'
    ];

    const gridCols = windowWidth < 400 ? 'grid-cols-2' : 
                    windowWidth < 640 ? 'grid-cols-3' : 'grid-cols-4';

    return (
      <div className={`p-2 grid ${gridCols} gap-1 text-[#014DF5]`}>
        {timeOptions.map((time) => (
          <div
            key={time}
            className={`text-center py-1 sm:py-2 px-1 rounded-md cursor-pointer text-xs sm:text-sm ${
              desiredTime === time ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setDesiredTime(time);
              setShowTimeDropdown(false);
            }}
          >
            {time}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div ref={dateRef} className="relative w-full">
        <label className="block text-white text-sm font-semibold mb-2">
          Желаемая дата:
        </label>
        <div 
          className="flex items-center justify-between bg-white rounded-md py-2 px-3 sm:px-4 cursor-pointer h-12"
          onClick={() => setShowDateDropdown(!showDateDropdown)}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500 mr-1 sm:mr-2" />
          <span className="text-black text-base sm:text-lg">{desiredDate}</span>
          <div className="text-blue-500">
            <FontAwesomeIcon icon={showDateDropdown ? faChevronUp : faChevronDown} />
          </div>
        </div>
        
        {showDateDropdown && (
          <div className={`absolute z-10 mt-1 w-full sm:w-64 ${windowWidth < 640 ? 'left-0' : 'right-0 sm:-right-8'} bg-white shadow-lg rounded-md border border-gray-200`}>
            {renderCalendar()}
          </div>
        )}
      </div>

      <div ref={timeRef} className="relative w-full">
        <label className="block text-white text-sm font-semibold mb-2">
          Желаемое время:
        </label>
        <div 
          className="flex items-center justify-between bg-white rounded-md py-2 px-3 sm:px-4 cursor-pointer h-12"
          onClick={() => setShowTimeDropdown(!showTimeDropdown)}
        >
          <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-1 sm:mr-2" />
          <span className="text-black text-base sm:text-lg">{desiredTime}</span>
          <div className="text-blue-500">
            <FontAwesomeIcon icon={showTimeDropdown ? faChevronUp : faChevronDown} />
          </div>
        </div>
        
        {showTimeDropdown && (
          <div className={`absolute z-10 mt-1 w-full sm:w-60 ${windowWidth < 640 ? 'left-0' : 'right-0 sm:-right-8'} bg-white shadow-lg rounded-md border border-gray-200`}>
            {renderTimeOptions()}
          </div>
        )}
      </div>
    </>
  );
}

export default DateTimeSelector;