import React, { useEffect } from 'react';
import { GymSettings } from '../data/gymData';
import { MapPin, Clock, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    daum?: {
      roughmap?: {
        Lander: new (config: {
          timestamp: string;
          key: string;
          mapWidth: string;
          mapHeight: string;
        }) => { render: () => void };
      };
    };
  }
}

interface LocationProps {
  settings: GymSettings;
  onOpenSettings: () => void;
}

export const Location: React.FC<LocationProps> = ({ settings }) => {
  useEffect(() => {
    const containerId = 'daumRoughmapContainer1791989563176';
    const container = document.getElementById(containerId);
    if (!container) return;

    // Helper to replace the pin marker title with '펀펀복싱' and hide bottom bar
    const applyFunFunBoxingTitle = () => {
      // Hide bottom footer bar in Roughmap as requested
      const bottomBars = container.querySelectorAll<HTMLElement>(
        'div:nth-of-type(3), .wrap_controllers + div, .roughmap_maker_info'
      );
      bottomBars.forEach((bar) => {
        bar.style.display = 'none';
        bar.style.height = '0';
        bar.style.visibility = 'hidden';
      });

      const targetSpans = container.querySelectorAll<HTMLElement>(
        'div:nth-of-type(6) a > span, a > span, span'
      );
      targetSpans.forEach((span) => {
        if (
          span.parentElement?.tagName === 'A' &&
          span.textContent &&
          span.textContent !== '펀펀복싱' &&
          !span.textContent.includes('길찾기') &&
          !span.textContent.includes('지도 크게 보기') &&
          !span.textContent.includes('kakao')
        ) {
          span.textContent = '펀펀복싱';
        }
      });
    };

    const observer = new MutationObserver(() => {
      applyFunFunBoxingTitle();
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true });

    const renderKakaoMap = () => {
      try {
        if (window.daum?.roughmap?.Lander) {
          new window.daum.roughmap.Lander({
            timestamp: '1791989563176',
            key: '3a6m3pq8okd',
            mapWidth: '100%',
            mapHeight: '380',
          }).render();
          applyFunFunBoxingTitle();
        }
      } catch (err) {
        console.error('Failed to render Kakao Roughmap:', err);
      }
    };

    if (container.children.length === 0) {
      if (window.daum?.roughmap?.Lander) {
        renderKakaoMap();
      } else {
        const interval = setInterval(() => {
          if (window.daum?.roughmap?.Lander) {
            clearInterval(interval);
            renderKakaoMap();
          }
        }, 100);
        setTimeout(() => clearInterval(interval), 5000);
      }
    } else {
      applyFunFunBoxingTitle();
    }

    // Periodic check to ensure title remains updated after map renders
    const textCheckInterval = setInterval(applyFunFunBoxingTitle, 200);
    const stopCheckTimer = setTimeout(() => clearInterval(textCheckInterval), 6000);

    return () => {
      observer.disconnect();
      clearInterval(textCheckInterval);
      clearTimeout(stopCheckTimer);
    };
  }, []);

  return (
    <section id="location" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <MapPin className="w-4 h-4" />
            <span>LOCATION & HOURS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight text-balance">
            펀펀 복싱으로 오시는 길
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
            지도를 통해 펀펀 복싱의 상세 위치와 경로를 편리하게 확인해 보세요.
          </p>
        </div>

        {/* Content Grid: Info Cards (Left) & Kakao Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address Card */}
            <div className="p-6 bg-[#F5F5F3] rounded-2xl border border-[#E6E6E3] hover:border-neutral-400 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E6E3] text-[#FF6B24] flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">주소</span>
                  <h3 className="text-base font-bold text-[#171717] mt-1">
                    {settings.address}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {settings.addressDetail}
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 bg-[#F5F5F3] rounded-2xl border border-[#E6E6E3]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E6E3] text-[#FF6B24] flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">운영 시간</span>
                  <div className="mt-2 space-y-1.5 text-xs text-neutral-700">
                    <div className="flex justify-between py-1 border-b border-neutral-200/60">
                      <span className="font-medium text-neutral-600">평일</span>
                      <span className="font-bold text-neutral-900">{settings.weekdayHours}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-200/60">
                      <span className="font-medium text-neutral-600">토요일</span>
                      <span className="font-bold text-neutral-900">{settings.saturdayHours}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-neutral-600">일요일 및 공휴일</span>
                      <span className="font-semibold text-neutral-500">{settings.sundayHolidayHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kakao Map Direct Link Info */}
            <div className="p-4 bg-[#FFF3EB] rounded-2xl border border-orange-200/60 text-xs text-orange-950 flex items-center justify-between">
              <span className="font-medium">카카오맵 실시간 위치 연동 완료</span>
              <a
                href="https://map.kakao.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#FF6B24] hover:underline"
              >
                <span>길찾기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Real Kakao Roughmap */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="w-full rounded-2xl overflow-hidden border border-[#E6E6E3] shadow-sm bg-white p-1">
              <div
                id="daumRoughmapContainer1791989563176"
                className="root_daum_roughmap root_daum_roughmap_landing w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
