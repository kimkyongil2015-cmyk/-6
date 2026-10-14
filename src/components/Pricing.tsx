import React from 'react';
import { INITIAL_PRICING } from '../data/gymData';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectPlanForInquiry?: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = () => {
  // Display the top 3 core membership plans in a single clean row
  const plans = INITIAL_PRICING.slice(0, 3);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F5F5F3] border-y border-[#E6E6E3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>MEMBERSHIP PLANS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight text-balance">
            내게 맞는 수업을 선택하세요
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
            합리적인 정기권부터 1:1 개인 맞춤 레슨까지, 회원님의 운동 목표와 일정에 맞춰 안내해 드립니다.
          </p>
        </div>

        {/* 3 Plans In A Single Row (1줄 3개 배치) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-7 border transition-all flex flex-col justify-between ${
                item.isPopular
                  ? 'border-[#FF6B24] shadow-md ring-1 ring-[#FF6B24]/20 relative'
                  : 'border-[#E6E6E3] shadow-sm hover:border-neutral-400'
              }`}
            >
              <div>
                {/* Popular Badge Indicator */}
                {item.isPopular ? (
                  <div className="text-[11px] font-bold text-[#FF6B24] mb-2 tracking-wide uppercase">
                    추천 멤버십
                  </div>
                ) : (
                  <div className="text-[11px] font-medium text-neutral-400 mb-2 tracking-wide uppercase">
                    STANDARD
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#171717]">{item.name}</h3>
                <p className="text-xs text-neutral-500 mt-1 mb-5">{item.period}</p>

                {/* Target info */}
                <p className="text-xs font-semibold text-neutral-700 mb-4 pb-3 border-b border-neutral-100">
                  추천 대상: {item.target}
                </p>

                {/* Features included */}
                <div className="space-y-2.5">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                      <Check className="w-3.5 h-3.5 text-[#FF6B24] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
