import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFF3EB] text-[#FF6B24] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171717]">
              개인정보 수집 및 이용 동의 안내
            </h3>
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

        {/* Content */}
        <div className="py-5 overflow-y-auto space-y-4 text-xs text-neutral-600 leading-relaxed">
          <p className="font-medium text-neutral-900">
            '펀펀 복싱(FUN FUN BOXING)'은 회원의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
          </p>

          <div className="p-4 bg-[#F5F5F3] rounded-xl space-y-2">
            <h4 className="font-bold text-neutral-800">1. 수집하는 개인정보의 항목</h4>
            <p>- 필수항목: 성함, 휴대전화번호, 희망 프로그램, 희망 방문 날짜 및 시간대</p>
            <p>- 선택항목: 추가 문의사항 및 운동 목표</p>
          </div>

          <div className="p-4 bg-[#F5F5F3] rounded-xl space-y-2">
            <h4 className="font-bold text-neutral-800">2. 개인정보의 수집 및 이용 목적</h4>
            <p>- 복싱 무료 체험 신청 확인 및 방문 일정 조율 안내</p>
            <p>- 맞춤형 프로그램 및 수강료 혜택 관련 상담 응대</p>
          </div>

          <div className="p-4 bg-[#F5F5F3] rounded-xl space-y-2">
            <h4 className="font-bold text-neutral-800">3. 개인정보의 보유 및 이용 기간</h4>
            <p>- 무료 체험 상담 및 안내 완료 후 최대 3개월 보관 후 지체 없이 파기합니다.</p>
            <p>- 고객의 파기 요청 시 즉시 복구 불가능한 방법으로 영구 삭제합니다.</p>
          </div>

          <div className="p-4 bg-[#F5F5F3] rounded-xl space-y-2">
            <h4 className="font-bold text-neutral-800">4. 동의를 거부할 권리 및 거부 시 불이익</h4>
            <p>
              귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단, 필수항목 동의 거부 시 무료 체험 예약 및 사전 상담 안내가 제한될 수 있습니다.
            </p>
          </div>

          <p className="text-[11px] text-neutral-400">
            ※ 정식 개점 후 운영자 정보(개인정보보호책임자 성명 및 연락처)가 상세 고지됩니다.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] rounded-xl transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
