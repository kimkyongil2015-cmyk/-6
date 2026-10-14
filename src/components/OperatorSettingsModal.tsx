import React, { useState } from 'react';
import { GymSettings, INITIAL_GYM_SETTINGS } from '../data/gymData';
import { X, Check, RotateCcw, Building, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

interface OperatorSettingsModalProps {
  isOpen: boolean;
  currentSettings: GymSettings;
  onSave: (newSettings: GymSettings) => void;
  onClose: () => void;
}

export const OperatorSettingsModal: React.FC<OperatorSettingsModalProps> = ({
  isOpen,
  currentSettings,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<GymSettings>({ ...currentSettings });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      isCustomized: true,
    });
    setToastMessage('설정이 성공적으로 저장되었습니다.');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 500);
  };

  const handleReset = () => {
    setForm({ ...INITIAL_GYM_SETTINGS });
  };

  const fillSampleGangnam = () => {
    setForm((prev) => ({
      ...prev,
      address: '서울특별시 강남구 테헤란로 152',
      addressDetail: '강남파이낸스센터 인근 3층 펀펀 복싱',
      phone: '02-555-7890 (상담 직통)',
      transitInfo: '지하철 2호선 역삼역 2번 출구 도보 2분, 강남역 도보 8분',
      parkingInfo: '건물 지하 주차장 2시간 무료 지원 및 기계식 주차 가능',
      weekdayHours: '평일 09:30 ~ 23:00',
      saturdayHours: '토요일 10:00 ~ 18:00',
      sundayHolidayHours: '일요일 및 공휴일 정기 휴관',
    }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 my-8 animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF3EB] text-[#FF6B24] flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#171717]">
                펀펀 복싱 운영자 지점 설정
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              정식 개점 시 체육관 주소, 연락처, 운영시간을 실시간으로 업데이트할 수 있는 편집 영역입니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Sample Button */}
        <div className="mt-4 p-3 bg-[#FFF3EB] rounded-xl border border-orange-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-orange-950 font-medium">
            <Sparkles className="w-4 h-4 text-[#FF6B24]" />
            <span>원클릭 샘플 주소 적용해보기 (테스트용)</span>
          </div>
          <button
            type="button"
            onClick={fillSampleGangnam}
            className="px-2.5 py-1 text-xs font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] rounded-lg transition-colors shadow-2xs whitespace-nowrap"
          >
            강남점 샘플 입력
          </button>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
          {/* Address */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B24]" />
              <span>체육관 주소</span>
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="예: 서울특별시 강남구 테헤란로 123"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">
              상세 위치 안내
            </label>
            <input
              type="text"
              value={form.addressDetail}
              onChange={(e) => setForm({ ...form, addressDetail: e.target.value })}
              placeholder="예: 역삼역 3번 출구 도보 2분 삼원빌딩 3층"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#FF6B24]" />
              <span>상담 연락처 (전화번호)</span>
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="예: 02-1234-5678 또는 010-9876-5432"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
            />
          </div>

          {/* Operating Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6B24]" />
                <span>평일 운영 시간</span>
              </label>
              <input
                type="text"
                value={form.weekdayHours}
                onChange={(e) => setForm({ ...form, weekdayHours: e.target.value })}
                placeholder="예: 평일 10:00 ~ 23:00"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6B24]" />
                <span>토요일 운영 시간</span>
              </label>
              <input
                type="text"
                value={form.saturdayHours}
                onChange={(e) => setForm({ ...form, saturdayHours: e.target.value })}
                placeholder="예: 토요일 11:00 ~ 18:00"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
              />
            </div>
          </div>

          {/* Transit & Parking */}
          <div>
            <label className="block font-bold text-neutral-800 mb-1">
              대중교통 안내 문구
            </label>
            <input
              type="text"
              value={form.transitInfo}
              onChange={(e) => setForm({ ...form, transitInfo: e.target.value })}
              placeholder="예: 지하철 2호선 역삼역 3번 출구 직진 100m"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-800 mb-1">
              주차 안내 문구
            </label>
            <input
              type="text"
              value={form.parkingInfo}
              onChange={(e) => setForm({ ...form, parkingInfo: e.target.value })}
              placeholder="예: 건물 내 무료 주차 1시간 30분 지원"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>초기 상태로 되돌리기</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                취소
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] rounded-xl shadow-xs transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>적용 및 저장</span>
              </button>
            </div>
          </div>
        </form>

        {toastMessage && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-center text-xs font-medium">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
