import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetData, PostData } from '../../../../fetchers/CRUD';
import { orders, pricesUrl } from '../../../../fetchers/URL_SERVER';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectSelectedService, setSelectedService } from '../../../store/serviceSlice';
import ContactForm from './FormComponents/ContactForm';
import CalculatorForm from './FormComponents/CalculatorForm';
import DateTimeSelector from './FormComponents/DateTimeSelector';
import ServiceSelector from './FormComponents/ServiceSelector';
import OptionSelector from './FormComponents/OptionSelector';

function PriceCalculator() {
  const [services, setServices] = useState(null);
  const selectedService = useSelector(selectSelectedService);
  const dispatch = useDispatch();
  const city = localStorage.getItem('city')
  const [numberOfMovers, setNumberOfMovers] = useState(2);
  const [numberOfHours, setNumberOfHours] = useState(2);
  const [hasElevator, setHasElevator] = useState(true);
  const [needCar, setNeedCar] = useState(true);
  const [floor, setFloor] = useState(11);
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}`;
  const [desiredDate, setDesiredDate] = useState(formattedDate);
  const [desiredTime, setDesiredTime] = useState('13:00');
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('+7');
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    GetData(pricesUrl, handleData);
  }, []);
  const handleData = (data, status) => {
    if (status === 200) {
      setServices(data);
      setError(null);
    } else {
      console.error('Ошибка загрузки данных:', status);
      setError(`Ошибка загрузки данных: ${status}`);
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000
      });
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [selectedService, numberOfMovers, numberOfHours, hasElevator, needCar, floor, services]);

  const calculatePrice = () => {
    if (!services) return;
    if (!selectedService) {
      setTotalPrice(0);
      return;
    }

    const service = services.find((s) => s.service === selectedService);
    if (!service) {
      setTotalPrice(0);
      return;
    }

    let basePrice = service.price_with_discount;
    let calculatedPrice = basePrice * numberOfMovers * numberOfHours;

    if (!hasElevator) {
      calculatedPrice += floor > 1 ? (floor - 1) * 50 : 0;
    }

    if (needCar) {
      calculatedPrice += 200;
    }

    setTotalPrice(calculatedPrice);
  };

  const handleServiceChange = (event) => {
    dispatch(setSelectedService(event.target.value));
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+7\s?9\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!agreedToTerms) {
      toast.warning("Необходимо согласиться с обработкой персональных данных", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    if (!selectedService) {
      toast.warning("Пожалуйста, выберите услугу", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Введите корректный номер телефона в формате +7 9XX XXX XX XX", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    calculatePrice();
    setFormSubmitted(true);
    toast.success("Расчет выполнен успешно! Мы свяжемся с вами в ближайшее время.", {
      position: "top-right",
      autoClose: 5000
    });
    
    console.log("Форма потверждена", {
      city: city,
      service: selectedService,
      movers: numberOfMovers,
      hours: numberOfHours,
      hasElevator,
      needCar,
      floor,
      date: desiredDate,
      time: desiredTime,
      phone: phoneNumber,
      price: totalPrice
    });
      PostData(orders,{
        city: city,
        service: selectedService,
        movers: numberOfMovers,
        hours: numberOfHours,
        hasElevator,
        needCar,
        floor,
        date: desiredDate,
        time: desiredTime,
        phone: phoneNumber,
        price: totalPrice
      },funcFeetback);
  };
  function funcFeetback(params) {
    params
  }


  
  

  return (
    <section id="price-calculator" className=" flex items-center justify-center p-2 sm:p-4">
      <ToastContainer />
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 bg-[#014DF5] rounded-lg p-3 sm:p-6">
        <div className="flex flex-col justify-between p-2 sm:p-4">
          <div className="mb-4 sm:mb-8">
            <svg className="w-24 sm:w-32 h-6 sm:h-8 mb-2 sm:mb-4" viewBox="0 0 120 24">
              <path d="M0,12 Q15,5 30,12 Q45,19 60,12 Q75,5 90,12 Q105,19 120,12" stroke="white" fill="none" strokeWidth="2" />
            </svg>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
              Рассчитайте стоимость услуг грузчиков<br className="hidden sm:block" />
              в городе Екатеринбурге
            </h2>
          </div>

          <ContactForm 
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
          />
        </div>

        <div className="flex flex-col space-y-3 sm:space-y-4 p-2 sm:p-4">
          {error && (
            <div className="text-red-500 bg-white p-2 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <OptionSelector 
              value={numberOfMovers} 
              setValue={setNumberOfMovers} 
              iconName="faDolly" 
              label="Количество грузчиков:" 
            />
            <OptionSelector 
              value={floor} 
              setValue={setFloor} 
              iconName="faBuilding" 
              label="Этаж:" 
            />
            <OptionSelector 
              value={numberOfHours} 
              setValue={setNumberOfHours} 
              iconName="faClock" 
              label="Количество часов:" 
            />
            <DateTimeSelector 
              desiredDate={desiredDate}
              setDesiredDate={setDesiredDate}
              desiredTime={desiredTime}
              setDesiredTime={setDesiredTime}
              windowWidth={windowWidth}
            />
            <ServiceSelector 
              services={services}
              selectedService={selectedService}
              handleServiceChange={handleServiceChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-1 sm:mt-2">
            <CalculatorForm 
              hasElevator={hasElevator}
              setHasElevator={setHasElevator}
              needCar={needCar}
              setNeedCar={setNeedCar}
            />
          </div>

          <div className="mt-2 sm:mt-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Итоговая стоимость: <span className="text-green-300">{totalPrice}</span> рублей
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceCalculator;