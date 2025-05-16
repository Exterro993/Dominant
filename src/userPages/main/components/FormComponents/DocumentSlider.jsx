import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DocumentSlider = () => {
  // Sample document images - replace with your actual images
  const documents = [
    { id: 1, url: '/doc.png', alt: 'Document 1' },
    { id: 2, url: '/doc.png', alt: 'Document 2' },
    { id: 3, url: '/doc.png', alt: 'Document 3' },
    { id: 4, url: '/doc.png', alt: 'Document 4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? documents.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === documents.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-2 md:px-4">
      {isMobile ? (
        <div className="w-full py-2">
          <div className="relative bg-blue-50 p-2 rounded-md border border-blue-100 shadow-md mx-auto max-w-xs">
            <img 
              src={documents[currentIndex].url} 
              alt={documents[currentIndex].alt} 
              className="w-full object-contain"
            />
            <div className="absolute bottom-4 right-4">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                <ChevronRight size={16} color="white" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-4 p-4 overflow-x-auto w-full">
          {documents.map((doc, index) => (
            <div 
              key={doc.id} 
              className={`relative flex-shrink-0 bg-blue-50 p-2 rounded-md border border-blue-100 transition-all duration-300 ${
                index === currentIndex ? 'scale-105 shadow-md' : 'opacity-70'
              }`}
              style={{ width: '200px' }}
            >
              <img 
                src={doc.url} 
                alt={doc.alt} 
                className="w-full object-contain"
              />
              {index === currentIndex && (
                <div className="absolute bottom-4 right-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                    <ChevronRight size={16} color="white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-2 mt-4 mb-2">
        <button 
          onClick={goToPrevious}
          className="w-10 h-10 md:w-8 md:h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
          aria-label="Previous document"
        >
          <ChevronLeft size={isMobile ? 24 : 20} />
        </button>
        <button 
          onClick={goToNext}
          className="w-10 h-10 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
          aria-label="Next document"
        >
          <ChevronRight size={isMobile ? 24 : 20} />
        </button>
      </div>
      
      {isMobile && (
        <div className="flex justify-center space-x-1 mt-2">
          {documents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-4 bg-blue-500' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to document ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentSlider;