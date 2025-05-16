import React from 'react'

const Block = () => {
    const city = localStorage.getItem('city')
  return (
    <>
    <section className='font-[Manrope] transition-colors mx-auto w-1/2 mb-32 flex justify-center items-center max-2xl:flex-wrap max-lg:w-auto'>
        <div className='block-left'>
            <img width={'484px'} height={'425px'} src="./group.svg" alt="" className='w-[484px]'/>
        </div>
        <div className='block-right w-[653px] leading-[150%]'>
            <img src="./zigzag.svg" alt="" />
            <div className='flex flex-col gap-4 max-lg:flex-wrap'>
                <h1 className='text-5xl font-extrabold max-lg:text-2xl max-lg:text-[15px]'>Грузчики в {city}е недорого – аккуратно и в любое время!</h1>
                <p className=' text-[#5A5A5A] max-lg:text-[11px]'>
                Услуги грузчиков необходимы при переезде, осуществлении строительных и ремонтных работ. В нашей компании «Доминант» вы можете заказать услуги грузчика недорого в любое удобное для вас время. Работаем аккуратно с хрупкими грузами, которые требуют повышенной осторожности. 
                </p>
                <span className='text-[#000] dark:text-[#FFF]'>Заказать услуги грузчиков в Омске и быть уверенным в качественной работе можно по телефону +7(995) 999-50-38.</span>
            </div>
        </div>
    </section>
    </>
  )
}

export default Block