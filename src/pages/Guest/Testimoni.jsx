import React, { useState } from "react";
import reviewsData from "../../JSON/testimoni.json";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
        <p className="text-gray-500">Testimoni tidak tersedia.</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative py-16 md:py-20 bg-black text-white font-serif">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Apa Kata Mereka?
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="bg-gray-900 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[350px] md:min-h-[380px]"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.6 }}
          >
            {/* Gambar */}
            <div className="w-full md:w-[300px] lg:w-[350px] flex-none">
              <img
                src={
                  currentReview.image_url ||
                  "https://via.placeholder.com/300x400?text=No+Image"
                }
                alt={currentReview.name}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/300x400?text=Image+Error";
                }}
              />
            </div>

            {/* Konten teks */}
            <div className="flex-grow p-6 md:p-10 flex flex-col justify-center">
              <div className="relative">
                <span
                  className="absolute -top-6 -left-4 text-6xl md:text-7xl text-yellow-400 opacity-80"
                  style={{ lineHeight: "0.8" }}
                  aria-hidden="true"
                >
                  “
                </span>
                <p className="text-gray-300 italic text-base md:text-lg leading-relaxed ml-6 md:ml-10">
                  {currentReview.comment}
                </p>
              </div>
              <div className="mt-6 md:mt-8 text-left">
                <h4 className="font-bold text-xl md:text-2xl text-white">
                  {currentReview.name}
                </h4>
                <p className="text-sm md:text-base text-yellow-400">
                  {currentReview.title || "Reviewer"}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigasi */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-[-16px] z-10 bg-gray-800 hover:bg-yellow-400 hover:text-black text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-[-16px] z-10 bg-gray-800 hover:bg-yellow-400 hover:text-black text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          aria-label="Next testimonial"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
