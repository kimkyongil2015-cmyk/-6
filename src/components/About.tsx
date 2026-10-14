import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AboutProps {
  onOpenTrial?: () => void;
}

export const About: React.FC<AboutProps> = () => {
  return (
    <section id="about" className="py-16 lg:py-20 bg-[#F5F5F3] border-y border-[#E6E6E3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>ABOUT FUN FUN BOXING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight text-balance">
            운동이 즐거워지는 곳, 펀펀 복싱
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance max-w-2xl mx-auto">
            복싱이 처음이어도 괜찮아요. 기초부터 차근차근 배우며 나만의 페이스로 성장할 수 있어요.<br className="hidden sm:inline" />
            펀펀 복싱은 운동의 즐거움과 건강한 습관을 함께 만들어 가는 공간입니다.
          </p>
        </div>
      </div>
    </section>
  );
};
