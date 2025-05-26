import React, { useState } from 'react';
// Make sure this path is correct for your project structure.
import reviewsData from '../../JSON/testimoni.json'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Testimoni() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = reviewsData;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No testimonials available.</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative py-12 md:py-16 bg-white">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
    Apa Kata Mereka?
  </h2>
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden min-h-[350px] md:min-h-[380px]">
          {/* Image Section */}
          <div className="w-full md:w-[280px] lg:w-[320px] flex-none bg-gray-200">
            <img
              src={currentReview.image_url || 'https://via.placeholder.com/300x400?text=No+Image'} // Fallback image
              alt={currentReview.name}
              className="w-full h-64 md:h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/300x400?text=Image+Error"; }} // Handle broken image links
            />
          </div>

          {/* Text Content Section */}
          <div className="flex-grow p-6 pt-8 md:p-8 flex flex-col justify-center">
            <div className="relative">
              <span 
                className="absolute -top-4 md:-top-5 -left-2 md:-left-3 text-5xl md:text-7xl text-hijau font-serif opacity-80" 
                style={{ lineHeight: '0.8' }}
                aria-hidden="true"
              >
                “
              </span>
              <p className="text-gray-600 italic text-base md:text-lg leading-relaxed ml-6 md:ml-8">
                {currentReview.comment} {/* Changed from quote to comment */}
              </p>
            </div>
            <div className="mt-6 md:mt-8 text-left">
              <h4 className="font-bold text-xl md:text-2xl text-gray-800">{currentReview.name}</h4>
              <p className="text-sm md:text-base text-gray-500">{currentReview.title || "Reviewer"}</p> {/* Added fallback for title */}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 
                     left-[-12px] sm:left-[-18px] md:left-[-24px] 
                     z-10 bg-white rounded-full p-2.5 md:p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-150 ease-in-out"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 
                     right-[-12px] sm:right-[-18px] md:right-[-24px] 
                     z-10 bg-white rounded-full p-2.5 md:p-3 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-150 ease-in-out"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}