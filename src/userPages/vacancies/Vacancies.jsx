import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { vacancies_URL } from '../../../fetchers/URL_SERVER';
import { GetData } from '../../../fetchers/CRUD';
import { FaWhatsapp } from "react-icons/fa";
const VacancyCard = ({ title, salary, description, requirements, conditions }) => {
  const [activeTab, setActiveTab] = useState('description');
  const oldTabRef = useRef('description');
  const cardRef = useRef(null);

  const handleTabClick = (tabName) => {
    if (tabName === activeTab) return;
    
    const oldTabContent = cardRef.current.querySelector(`#${oldTabRef.current}`);
    const newTabContent = cardRef.current.querySelector(`#${tabName}`);
    
    // Animate out old content
    anime({
      targets: oldTabContent,
      opacity: [1, 0],
      translateY: [0, -10],
      duration: 300,
      easing: 'easeInOutQuad',
      complete: function() {
        // Update state to show new content
        oldTabRef.current = tabName;
        setActiveTab(tabName);
        
        // Animate in new content (handled by useEffect)
      }
    });
  };

  useEffect(() => {
    // This runs after the new content is rendered to the DOM
    const newTabContent = cardRef.current.querySelector(`#${activeTab}`);
    if (newTabContent) {
      // Animate in new content
      anime({
        targets: newTabContent,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  }, [activeTab]);

  return (
    <div className="vacancy-card shadow shadow-gray-300 dark:shadow-blue-500" ref={cardRef}>
      <div className="vacancy-header">
        <h2 className="vacancy-title text-[#050505] dark:text-[#FFF]">{title}</h2>
        <div className="vacancy-salary"> от {salary}/смена</div>
      </div>
      
      <div className="vacancy-tabs">
        <button 
          className={`tab text-[#050505] dark:text-[#FFF] ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => handleTabClick('description')}
        >
          Описание
        </button>
        <button 
          className={`tab text-[#050505] dark:text-[#FFF] ${activeTab === 'requirements' ? 'active' : ''}`}
          onClick={() => handleTabClick('requirements')}
        >
          Требования
        </button>
        <button 
          className={`tab text-[#050505] dark:text-[#FFF] ${activeTab === 'conditions' ? 'active' : ''}`}
          onClick={() => handleTabClick('conditions')}
        >
          Условия
        </button>
      </div>
      
      <div 
        id="description" 
        className="tab-content text-[#050505] dark:text-[#FFF]" 
        style={{ 
          display: activeTab === 'description' ? 'block' : 'none',
          opacity: activeTab === 'description' ? 1 : 0
        }}
      >
        {description}
      </div>
      
      <div 
        id="requirements" 
        className="tab-content text-[#050505] dark:text-[#FFF]"
        style={{ 
          display: activeTab === 'requirements' ? 'block' : 'none',
          opacity: activeTab === 'requirements' ? 1 : 0
        }}
      >
        {requirements}
      </div>
      
      <div 
        id="conditions" 
        className="tab-content text-[#050505] dark:text-[#FFF]"
        style={{ 
          display: activeTab === 'conditions' ? 'block' : 'none',
          opacity: activeTab === 'conditions' ? 1 : 0
        }}
      >
        {conditions}
      </div>
    </div>
  );
};

const JobListings = () => {
  const [vacancies, setVacancies] = useState([]);
  useEffect(() => {
    GetData(vacancies_URL, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      setVacancies(data);
    } else {
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <section className="container font-[Manrope]">
      <img src="zigzag.svg" alt="" />
      <h1 className=' font-extrabold text-5xl '>ВАКАНСИИ</h1>
      <p className=' text-gray-500 pb-5'>Компания «Доминант» приглашает на подработки грузчиков и разнорабочих.</p>
      <div className='flex pb-10 items-center gap-1'>
        <button  className='bg-[#014DF5] text-[#fff] px-[32px] py-3.5 rounded-lg'>Отправить резюме</button>
        <div>
        <p className='flex  items-center gap-1'>Напишите нам в вотсапп <FaWhatsapp /></p>
        </div>
      </div>
      {vacancies.map((vacancy) => (
        <VacancyCard 
          key={vacancy.id}
          title={vacancy.title}
          salary={vacancy.salary}
          description={vacancy.description}
          requirements={vacancy.requirements}
          conditions={vacancy.conditions}
        />
      ))}
    </section>
  );
};

const styles = `
  
  .container {
    max-width: 1200px;
    margin: 0 auto; 
    margin-top: 100px;
    margin-bottom: 100px;
  }
  
  .vacancy-card {
    // background-color: #fff;
    border-radius: 8px;
    // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
  }
  
  .vacancy-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #eaeef5;
  }
  
  .vacancy-title {
    font-size: 24px;
    font-weight: bold;
    // color: #333;
  }
  
  .vacancy-salary {
    font-size: 18px;
    font-weight: bold;
    color: #0066ff;
  }
  
  .vacancy-tabs {
    display: flex;
    // background-color: #f5f7fa;
    padding: 0 10px;
  }
  
  .tab {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    // background-color: #f5f7fa;
    border: none;
    outline: none;
    // color: #6b7c93;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #0066ff;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  .tab.active {
    color: #0066ff;
    // background-color: #e1e7f4;
    font-weight: bold;
    border-radius: 4px 4px 0 0;
  }
  
  .tab.active::after {
    transform: translateX(0);
  }
  
  .tab-content {
    padding: 20px;
    line-height: 1.6;
    font-size: 15px;
    // color: #4a4a4a;
  }
  
  @media (max-width: 768px) {
    .vacancy-header {
      flex-direction: column;
      align-items: flex-start;
    }
    .vacancy-salary {
      margin-top: 10px;
    }
  }
`;

// Main App component
const App = () => {
  return (
    <>
      <style>{styles}</style>
      <JobListings />
    </>
  );
};

export default App;