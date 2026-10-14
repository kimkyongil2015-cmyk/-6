import React from 'react';
import { INITIAL_PROGRAMS } from '../data/gymData';
import { Check, Dumbbell, Sparkles } from 'lucide-react';

interface ProgramsProps {
  onSelectProgramForTrial?: (programTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = () => {
  // Duplicate for seamless infinite loop marquee
  const marqueeList = [...INITIAL_PROGRAMS, ...INITIAL_PROGRAMS];

  return (
    <section id="programs" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <Dumbbell className="w-4 h-4" />
            <span>TRAINING CURRICULUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight text-balance">
            나에게 맞는 복싱 프로그램
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
            체력 수준과 운동 목적에 맞춰 무리 없이 즐길 수 있도록 세분화된 맞춤형 커리큘럼을 제공합니다.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B24]" />
            <span>카드를 마우스로 가리키면 흐름이 멈춰 편하게 확인하실 수 있습니다.</span>
          </div>
        </div>

        {/* Single-line flowing marquee container (한줄에서 천천히 왼쪽으로 흐르는 애니메이션 효과) */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Subtle edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="marquee-track flex gap-6 items-stretch">
            {marqueeList.map((prog, index) => (
              <div
                key={`${prog.id}-${index}`}
                className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-2xl border border-[#E6E6E3] overflow-hidden shadow-sm hover:border-[#FF6B24] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Fallback */}
                  <div className="relative h-48 bg-neutral-100 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={`${prog.title} 트레이닝 이미지`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Subtle scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Clean Text Label */}
                    <div className="absolute top-3 left-3 text-xs font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                      {prog.code}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-mono text-orange-300 font-semibold">{prog.subtitle}</p>
                      <h3 className="text-lg font-bold leading-tight drop-shadow-sm">{prog.title}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    {/* Target text */}
                    <p className="text-xs font-semibold text-[#FF6B24] mb-2">
                      권장 대상: {prog.target}
                    </p>

                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {prog.description}
                    </p>

                    {/* Key Features Bullet List */}
                    <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                      {prog.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <Check className="w-3.5 h-3.5 text-[#FF6B24] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
