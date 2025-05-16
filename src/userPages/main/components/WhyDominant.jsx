import React from 'react'

const WhyDominant = () => {
  return (
    <>
    <section className='font-[Manrope] transition-colors mx-auto w-1/2 mb-32'>
    <img className='mx-auto' src="/zigzag.svg" alt="" />
    <h1 className='text-center pb-5 pt-4 text-[46px]'>Почему выбирают DOMINANT</h1>
    <div className='flex max-xl:flex-wrap'>
        <div className='flex flex-col items-center gap-16 text-[22px] justify-center h-[278px] w-[260px] rounded-xs duration-500 dark:hover:bg-[#b6b7be] p-4 hover:bg-[#F7F8FC]'>
            <img width={'80px'} src="/icons/no-alcohol.svg" alt="" />
            <p className='text-center'>Всегда трезвые <br /> грузчики</p>
        </div>
        <div className='flex flex-col items-center gap-16 text-[22px] justify-center h-[278px] w-[260px] rounded-xs duration-500 dark:hover:bg-[#b6b7be] p-4 hover:bg-[#F7F8FC]'>
            <img width={'80px'} src="/icons/calendar.svg" alt="" />
            <p className='text-center'>Приезжаем <br /> вовремя</p>
        </div>
        <div className='flex flex-col items-center gap-16 text-[22px] justify-center h-[278px] w-[260px] rounded-xs duration-500 dark:hover:bg-[#b6b7be] p-4 hover:bg-[#F7F8FC]'>
            <img width={'80px'} src="/icons/credit-card.svg" alt="" />
            <p className='text-center'>Любой вид <br /> оплаты</p>
        </div>
        <div className='flex flex-col items-center gap-16 text-[22px] justify-center h-[278px] w-[260px] rounded-xs duration-500 dark:hover:bg-[#b6b7be] p-4 hover:bg-[#b6b7be]'>
            <img width={'80px'} src="/icons/24-hours-support.svg" alt="" />
            <p className='text-center'>Работаем <br /> круглосуточно</p>
        </div>
    </div>
    </section>
    </>
  )
}

export default WhyDominant