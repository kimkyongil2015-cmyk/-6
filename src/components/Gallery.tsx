import React, { useState } from 'react';
import { INITIAL_GALLERY, FacilityPhoto } from '../data/gymData';
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<FacilityPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (photo: FacilityPhoto, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex - 1 + INITIAL_GALLERY.length) % INITIAL_GALLERY.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(INITIAL_GALLERY[nextIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % INITIAL_GALLERY.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(INITIAL_GALLERY[nextIdx]);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <Camera className="w-4 h-4" />
            <span>GYM FACILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight text-balance">
            펀펀 복싱의 활기찬 운동 공간
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
            쾌적하고 깨끗한 훈련 링, 무게별 샌드백 존, 1:1 패드워크 공간까지 안전하고 활력 있는 환경을 지향합니다.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_GALLERY.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item, idx)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E6E6E3] bg-neutral-100 shadow-sm hover:shadow-md transition-all relative flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-neutral-800 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Reference Flag */}
                <span className="absolute top-3 left-3 text-[11px] font-medium text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#FF6B24] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-end text-[11px] text-neutral-400">
                  <span className="text-[#FF6B24] font-medium group-hover:underline">클릭하여 확대 &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#171717] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col text-white"
          >
            {/* Top Close bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedPhoto.title}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{selectedPhoto.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors focus-visible:outline-none"
                aria-label="닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo frame */}
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label="이전 사진"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label="다음 사진"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Description footer */}
            <div className="p-4 px-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
              <p>{selectedPhoto.description}</p>
              <span className="font-mono text-neutral-500">
                {currentIndex + 1} / {INITIAL_GALLERY.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
