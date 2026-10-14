import React from 'react';
import { GymSettings } from '../data/gymData';
import { ArrowRight, Dumbbell, ShieldCheck, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  settings: GymSettings;
  onOpenTrial: () => void;
  onExplorePrograms: () => void;
  onOpenPrivacyModal: () => void;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenTrial,
  onExplorePrograms,
  onOpenPrivacyModal,
  onOpenSettings,
}) => {
  return (
    <footer className="bg-[#171717] text-white">
      {/* Final CTA Banner (Section 9 Main CTA) */}
      <div className="relative py-20 lg:py-24 border-b border-neutral-800 overflow-hidden">
        {/* Warm glow in dark surface */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B24]/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-4 uppercase">
            <span>START YOUR NEW ENERGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
            오늘부터 시작하는 새로운 에너지!
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed text-balance">
            복싱이 처음이어도 괜찮아요. 펀펀 복싱에서 즐겁게 시작해 보세요.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenTrial}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] active:bg-[#D94F0E] rounded-xl shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B24] whitespace-nowrap"
            >
              <span>무료 체험 신청하기</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={onExplorePrograms}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 rounded-xl transition-all border border-neutral-700 whitespace-nowrap"
            >
              <span>프로그램 확인하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#FF6B24] flex items-center justify-center text-white">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                <span className="text-[#FF6B24]">펀펀</span> 복싱
              </span>
              <span className="text-xs font-mono text-neutral-400 font-bold ml-1">
                FUN FUN BOXING
              </span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              복싱을 처음 접하는 초보자부터 다이어트, 체력 증진, 퇴근 후 스트레스 해소까지 누구나 즐겁게 시작하는 복싱 피트니스 클럽입니다.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-xs text-neutral-400 hover:text-white underline"
              >
                지점 정보(주소/전화번호) 설정 관리
              </button>
            </div>
          </div>

          {/* Contact & Hours Info */}
          <div className="lg:col-span-4 space-y-3 text-xs text-neutral-300">
            <h4 className="font-bold text-sm text-white mb-3">안내 및 운영 시간</h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[11px]">위치</span>
                <span>{settings.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[11px]">상담 문의</span>
                <span>{settings.phone}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block text-[11px]">운영 시간</span>
                <span>{settings.weekdayHours} / {settings.saturdayHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation & Policy */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-white mb-3">바로가기</h4>
            <ul className="space-y-2">
              <li>
                <a href="#programs" className="text-neutral-400 hover:text-[#FF6B24] transition-colors">
                  프로그램 안내
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-neutral-400 hover:text-[#FF6B24] transition-colors">
                  시설 안내
                </a>
              </li>
              <li>
                <a href="#location" className="text-neutral-400 hover:text-[#FF6B24] transition-colors">
                  오시는 길
                </a>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onOpenPrivacyModal}
                  className="text-neutral-300 hover:text-[#FF6B24] underline flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>개인정보 처리방침</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            ※ 상호명: 펀펀 복싱 (FUN FUN BOXING) · 대표자 및 사업자등록번호는 공식 개점 확정 시 정식 공지됩니다.
          </p>
          <p className="font-mono text-neutral-400">
            &copy; 2026 FUN FUN BOXING. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
