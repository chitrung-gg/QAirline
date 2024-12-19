import React, { useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { Destination } from "@/interfaces/destination";
import { Image } from "@nextui-org/react";

interface CarouselProps {
    destinations: Destination[];
}

export default function Carousel({ destinations }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(1);

  // const slides = [
  //   {
  //       id: 1,
  //       image: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
  //       name: "Hanoi",
  //       country: "Vietnam",
  //       city: "Hanoi",
  //       description: "Hanoi is the capital of Vietnam and the country's second largest city by population. The city mostly lies on the right bank of the Red River. Hanoi is 1,720 km (1,070 mi) north of Ho Chi Minh City and 105 km (65 mi) west of Haiphong.",
  //   },
  //   {
  //       id: 2,
  //       image: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
  //       name: "Da Nang",
  //       country: "Vietnam",
  //       city: "Da Nang",
  //       description: "Da Nang is a class-1 municipality and the fifth-largest city in Vietnam by population. It lies on the coast of the South China Sea at the mouth of the Han River, and is one of Vietnam's most important port cities.",
  //   },
  //   {
  //       id: 3,
  //       image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
  //       name: "Ho Chi Minh City",
  //       country: "Vietnam",
  //       city: "Ho Chi Minh City",
  //       description: "Ho Chi Minh City, also known by its former name of Saigon, is the most populous city in Vietnam with a population of 9 million. Located in southeastern Vietnam, the city surrounds the Saigon River and covers about 2,061 square kilometers.",
  //   },
  //   {
  //       id: 4,
  //       image: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
  //       name: "Hue",
  //       country: "Vietnam",
  //       city: "Hue",
  //       description: "Huế is a city in central Vietnam that was the seat of Nguyen Dynasty emperors and the national capital from 1802 to 1945. A major attraction is its vast, 19th-century citadel, surrounded by a moat and thick stone walls.",
  //   },
  // ];

  // destinations = slides;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? destinations.length : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === destinations.length ? 1 : prev + 1));
  };

  return (
    <div className="relative w-full snap-x snap-mandatory scroll-smooth">
      <div className="flex w-full">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`w-full flex-none snap-start ${
                currentSlide === index + 1 ? "block" : "hidden"
              }`}
          >
            <img 
                src={destination.image || ""} 
                alt={`Slide ${index + 1}`} 
                className="w-full rounded-lg object-cover" 
            />
            <div className="absolute top-1/2 left-5 right-5 flex justify-between -translate-y-1/2 transform">
              <button
                onClick={handlePrev}
                className="max-h-fit my-auto text-white bg-black bg-opacity-50 hover:bg-opacity-70 text-5xl rounded-full"
              >
                <HiChevronLeft />
              </button>
              <div className="flex flex-col text-left text-white gap-1 md:gap-2 px-3">
                <p className="font-bold text-base md:text-2xl">{destination.city}</p>
                <p className="text-sm md:text-lg">{destination.country}</p>
                <p className="text-xs md:text-base">{destination.description}</p>
              </div>
              <button
                onClick={handleNext}
                className="max-h-fit my-auto text-white bg-black bg-opacity-50 hover:bg-opacity-70 text-5xl rounded-full"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
