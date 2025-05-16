import React from 'react'
import DocumentSlider from './FormComponents/DocumentSlider'

const WereChosen = () => {
  const city = localStorage.getItem('city')
  return (
    <>
    <section className='flex justify-center items-center mb-32'>
        <div className="container flex justify-center items-center gap-8 max-2xl:flex-wrap">
        <div className="container-left font-[Manrope]">
            <h1 className='font-extrabold text-5xl leading-[130%] tracking-[0%] pb-2'>Нас выбирают</h1>
            <img src="/zigzag.svg" alt="zigzag" />
            <p className='text-[#5A5A5A] pb-4 pt-12'>Стоит также отметить, что грузчики в {city}е работают <br /> круглосуточно. Таким образом, при переезде вы можете <br /> воспользоваться услугами в ночное время и избежать пробок ,<br /> сэкономив при этом.</p>
            <span className='text-[#5A5A5A]'>Стоимость услуг грузчиков можно узнать заполнив форму обратной <br /> связи на сайте или позвонив по номеру +7(995) 999-50-38.</span>
        </div>
        <div className="container-right">
            <DocumentSlider/>
        </div>
        </div>
    </section>
    </>
  )
}

export default WereChosen