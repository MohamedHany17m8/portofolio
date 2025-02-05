import React, { useState } from "react";

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const slides = [
    { src: "https://picsum.photos/600/400?random=1", alt: "Random Image 1" },
    { src: "https://picsum.photos/600/400?random=2", alt: "Random Image 2" },
    { src: "https://picsum.photos/600/400?random=3", alt: "Random Image 3" },
    { src: "https://picsum.photos/600/400?random=4", alt: "Random Image 4" },
    { src: "https://picsum.photos/600/400?random=5", alt: "Random Image 5" },
  ];

  const nextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setTimeout(() => {
        setCurrentSlide(0);
        setIsSliding(false);
      }, 500);
    }
    setTimeout(() => setIsSliding(false), 500);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    setTimeout(() => setIsSliding(false), 500);
  };

  return (
    <section className="mt-28 mb-10 px-16 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Featured Products
      </h1>

      <div className="relative w-full max-w-[600px] flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-[-60px] md:left-[-70px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-5 py-3 rounded-full shadow-md hover:bg-gray-900 transition"
        >
          ❮
        </button>

        {/* Image Container */}
        <div className="overflow-hidden rounded-xl shadow-lg w-full aspect-[3/2] bg-gray-200">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-[-60px] md:right-[-70px] top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-5 py-3 rounded-full shadow-md hover:bg-gray-900 transition"
        >
          ❯
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-2 mt-4">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${
              currentSlide === index ? "bg-gray-800" : "bg-gray-400"
            } transition`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Products;
