// ContactFeedback.jsx
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "./form/InputField";
import TextAreaField from "./form/TextAreaField";
import { feedback } from "../../../../fetchers/URL_SERVER";
import {  PostData } from '../../../../fetchers/CRUD';

const ContactFeedback = () => {
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+7\s9\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    return phoneRegex.test(phone);
  };

  const MAX_MESSAGE_LENGTH = 500;

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "+7",
    message: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const handleInputChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "phoneNumber") {
      if (!value.startsWith("+7")) {
        value = "+7" + (value.startsWith(" ") ? "" : " ") + value.replace("+7", "");
      }
    }
    if (field === "message" && value.length > MAX_MESSAGE_LENGTH) {
      value = value.substring(0, MAX_MESSAGE_LENGTH);
    }
    
    setFormData({
      ...formData,
      [field]: value
    });
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
    
    if (!formData.name.trim()) {
      toast.warning("Пожалуйста, введите ваше имя", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Введите корректный номер телефона в формате +7 9XX XXX XX XX", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    if (!formData.message.trim()) {
      toast.warning("Пожалуйста, введите ваше сообщение", {
        position: "top-right",
        autoClose: 5000
      });
      return;
    }
    
    const submissionData = {
      name: formData.name,
      phone: formData.phoneNumber,
      message: formData.message,
      submittedAt: new Date().toISOString()
    };
    PostData(feedback,submissionData,funcFeetback);
      function funcFeetback(params) {
        params
      }
    
    console.log("Форма отправлена", submissionData);
    
    
    toast.success("Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.", {
      position: "top-right",
      autoClose: 5000
    });

    
    setFormData({
      name: "",
      phoneNumber: "+7",
      message: ""
    });
    setAgreedToTerms(false);
  };
  
  return (
    <div className="bg-blue-600 p-4 md:p-8 rounded-lg w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white">Обратная связь</h1>
        <img src="/zigzag2.svg" alt="Декоративный элемент" className="h-6" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <InputField
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleInputChange("name")}
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              }
            />
            
            <InputField
              placeholder="+7 9xxx xxx xx xx"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-6 h-6"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              }
            />
          </div>
          
          <div className="w-full lg:w-1/2 h-32">
            <div className="relative w-full h-full">
              <TextAreaField 
                value={formData.message}
                onChange={handleInputChange("message")}
              />
              <div className="absolute bottom-1 right-4 text-white text-xs">
                {formData.message.length}/{MAX_MESSAGE_LENGTH}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="terms" className="text-white text-sm cursor-pointer">
              Отправляя форму Вы соглашаетесь с обработкой персональных данных и политикой конфеденциальности
            </label>
          </div>
          
          <button
            type="submit"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Отправить
          </button>
        </div>
      </form>
      
      {/* Контейнер для уведомлений */}
      <ToastContainer />
    </div>
  );
};

export default ContactFeedback;