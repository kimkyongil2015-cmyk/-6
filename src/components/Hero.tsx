import React from 'react';
import { Sparkles } from 'lucide-react';
import heroFunFunImg from '../assets/images/hero_funfun_boxing_korean_1791985384719.jpg';

interface HeroProps {
  onOpenTrial?: () => void;
  onExplorePrograms?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-white">
      {/* Background soft warm accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFF3EB] rounded-full filter blur-3xl opacity-70 -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-100 rounded-full filter blur-2xl opacity-60 -z-10 pointer-events-none -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Unboxed Brand Kicker (No Pill Enclosure) */}
            <div className="flex items-center gap-2 text-sm font-semibold text-[#FF6B24]">
              <Sparkles className="w-4 h-4" />
              <span>누구나 즐겁게 시작하는 복싱 피트니스</span>
              <span className="text-neutral-300" aria-hidden="true">·</span>
              <span className="text-neutral-600 font-medium">FUN FUN BOXING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-[#171717] leading-[1.2] text-balance">
              복싱, 어렵지 않아요.<br />
              <span className="text-[#FF6B24]">즐겁게 시작하는</span> 펀펀 복싱!
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl text-balance">
              운동 초보자부터 다이어트, 체력 관리까지.<br className="hidden sm:inline" />
              나에게 맞는 속도로 즐겁게 시작해 보세요.
            </p>
          </div>

          {/* Right Column: Dynamic Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6E6E3] shadow-md bg-neutral-100 group">
              <img
                src={heroFunFunImg}
                alt="펀펀 복싱(FUN FUN BOXING)에서 즐겁게 미트 트레이닝을 배우는 한국인 회원과 코치"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle contrast gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

              {/* In-photo badge note */}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-white/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#FF6B24]">처음이어도 안심</p>
                  <p className="text-sm font-bold text-neutral-900">1:1 기초 자세 및 미트 펀칭 체험</p>
                </div>
                <button
                  onClick={onOpenTrial}
                  className="px-3 py-1.5 text-xs font-semibold text-[#FF6B24] bg-[#FFF3EB] hover:bg-[#FFE3D1] rounded-lg transition-colors whitespace-nowrap"
                >
                  체험 신청 &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
