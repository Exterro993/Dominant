import React from 'react'

const AboutHero = () => {
  return (
    <>
    <section className='font-[Manrope] flex flex-col justify-center items-center'>
      <div className='flex items-center justify-center gap-10 mb-14 mt-14'>
      <div className='hero-left'>
      <img src="zigzag.svg" alt="" />
      <h1 className='text-5xl font-extrabold pb-3 pt-2'>О компании</h1>
      <p className='text-[#5A5A5A] pb-6'>Наша компания специализируется на профессиональных услугах <br /> грузчиков по всей России. Мы работаем с частными и <br /> корпоративными клиентами, обеспечивая быстрый, надёжный и <br /> аккуратный перенос, погрузку и разгрузку любых видов грузов — от <br /> мебели и бытовой техники до стройматериалов и оборудования.
      </p>
      </div>
      <div className='hero-right max-w-[500px]'>
        <img className='w-[500px]' src="logo.svg" alt="" />
      </div>
      </div>
    </section>
    </>
   
  )
}

export default AboutHero