import React from 'react'

const VideoFeedback = () => {
  return (
    <>
    <section className='w-full px-4 sm:px-6 md:px-8 mb-16 md:mb-32 font-[Manrope]'>
        <h1 className='text-center font-extrabold text-5xl mb-6'>Видео отзывы</h1>
        <div className='flex justify-center items-center gap-8 flex-wrap'>
            <div className='relative'>
                <img src="/videoreview1.png" className='relative' alt="" /> 
                <img className='absolute top-30 left-36' src="/pause.svg" alt="" />
                <div className='absolute top-55 left-2 text-[#FFF]'>
                <span>Ульяна М.</span>
                <p>Квартирный переезд . г. Москва</p>
                </div>
            </div>
            <div className='relative'>
                <img src="/videoreview1.png" className='relative' alt="" /> 
                <img className='absolute top-30 left-36' src="/pause.svg" alt="" />
                <div className='absolute top-55 left-2 text-[#FFF]'>
                <span>Ульяна М.</span>
                <p>Квартирный переезд . г. Москва</p>
                </div>
            </div>
            <div className='relative'>
                <img src="/videoreview1.png" className='relative' alt="" /> 
                <img className='absolute top-30 left-36' src="/pause.svg" alt="" />
                <div className='absolute top-55 left-2 text-[#FFF]'>
                <span>Ульяна М.</span>
                <p>Квартирный переезд . г. Москва</p>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default VideoFeedback