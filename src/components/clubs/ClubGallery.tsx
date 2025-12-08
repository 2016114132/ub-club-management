'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ClubGalleryProps {
  images: string[];
  clubName: string;
}

export default function ClubGallery({ images, clubName }: ClubGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
      {/* Main Image */}
      <div
        className="h-72 md:h-96 w-full transition-all duration-500"
        style={{ background: images[currentIndex] }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg group"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-text-dark group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-lg group"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-text-dark group-hover:text-primary transition-colors" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-6 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-sm text-white text-sm font-medium rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
