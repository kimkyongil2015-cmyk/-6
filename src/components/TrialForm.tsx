import React, { useState } from 'react';
import { INITIAL_PROGRAMS } from '../data/gymData';
import { Send, CheckCircle2, AlertCircle, Calendar, Clock, User, Phone, MessageSquare, ShieldCheck, ArrowRight, RefreshCw, FileText } from 'lucide-react';

interface TrialFormProps {
  initialProgram?: string;
  onOpenPrivacyModal: () => void;
}

interface FormState {
  name: string;
  phone: string;
  program: string;
  date: string;
  timeSlot: string;
  inquiry: string;
  agreePrivacy: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  program?: string;
  date?: string;
  timeSlot?: string;
  agreePrivacy?: string;
}

export const TrialForm: React.FC<TrialFormProps> = ({ initialProgram, onOpenPrivacyModal }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    program: initialProgram || '입문 복싱',
    date: '',
    timeSlot: '저녁 18:00 ~ 20:00',
    inquiry: '',
    agreePrivacy: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    submitted: boolean;
    data: FormState | null;
  }>({
    submitted: false,
    data: null,
  });

  // Phone number auto-formatter (010-XXXX-XXXX)
  const formatPhoneNumber = (value: string) => {
    const raw = value.replace(/[^0-9]/g, '');
    if (raw.length <= 3) return raw;
    if (raw.length <= 7) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '성함을 입력해 주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '성함을 2자 이상 정확히 입력해 주세요.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요.';
    } else if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.phone = '올바른 휴대폰 번호 10~11자리를 입력해 주세요.';
    }

    if (!formData.program) {
      newErrors.program = '희망 프로그램을 선택해 주세요.';
    }

    if (!formData.date) {
      newErrors.date = '희망 방문 날짜를 선택해 주세요.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = '희망 시간대를 선택해 주세요.';
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = '개인정보 수집 및 이용에 동의해 주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    // Simulate verification delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setSubmissionResult({
        submitted: true,
        data: { ...formData },
      });
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      program: '입문 복싱',
      date: '',
      timeSlot: '저녁 18:00 ~ 20:00',
      inquiry: '',
      agreePrivacy: true,
    });
    setErrors({});
    setSubmissionResult({ submitted: false, data: null });
  };

  const timeSlotOptions = [
    '오전 10:00 ~ 12:00',
    '오후 14:00 ~ 17:00',
    '저녁 18:00 ~ 20:00',
    '야간 20:00 ~ 22:00',
    '시간대 협의 희망',
  ];

  // Get tomorrow's date string for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return (
    <section id="trial" className="py-20 lg:py-28 bg-[#F5F5F3] border-t border-[#E6E6E3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B24] tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>FREE TRIAL & INQUIRY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight text-balance">
            복싱이 궁금하다면, 먼저 체험해 보세요!
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed text-balance">
            처음이라 망설여지시나요? 무료 체험을 신청하고 펀펀 복싱의 즐거운 분위기를 직접 경험해 보세요.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E6E6E3] shadow-md">
          {submissionResult.submitted && submissionResult.data ? (
            /* Submission Review Card (Directly addresses the test-mode transparency requirement) */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  <strong className="font-bold">현재 테스트 모드 안내:</strong>
                  <p className="mt-1">
                    현재 페이지는 데모 환경입니다. 입력하신 정보는 안전하게 검증되었으며, 실제 운영 환경에서는 <strong>체육관 운영자(카카오톡 알림톡, 이메일, 전용 CRM)</strong>로 즉시 전달되도록 연동 설정됩니다.
                  </p>
                </div>
              </div>

              {/* Submitted Details Review Summary */}
              <div className="bg-[#F5F5F3] rounded-2xl p-6 border border-[#E6E6E3] space-y-4">
                <h4 className="text-base font-bold text-[#171717] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B24]" />
                  <span>신청서 작성 완료 확인</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-xs">신청자 성함</span>
                    <span className="font-bold text-neutral-900">{submissionResult.data.name}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-xs">연락처</span>
                    <span className="font-bold text-neutral-900">{submissionResult.data.phone}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-xs">희망 프로그램</span>
                    <span className="font-bold text-[#FF6B24]">{submissionResult.data.program}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-xs">방문 희망 일정</span>
                    <span className="font-bold text-neutral-900">
                      {submissionResult.data.date} ({submissionResult.data.timeSlot})
                    </span>
                  </div>
                  {submissionResult.data.inquiry && (
                    <div className="col-span-full p-3 bg-white rounded-xl border border-neutral-200">
                      <span className="text-neutral-500 block text-xs">문의 사항</span>
                      <span className="text-neutral-800">{submissionResult.data.inquiry}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>새로운 신청서 작성하기</span>
                </button>

                <p className="text-xs text-neutral-500 text-center sm:text-right">
                  신청 접수 연동(Email / Webhook / DB) 설정 문의는 개발팀 또는 관리자 패널을 참고하세요.
                </p>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleOpenReview} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-neutral-800 mb-2">
                    이름 <span className="text-[#FF6B24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="홍길동"
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B24]/40 ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#E6E6E3] focus:border-[#FF6B24]'
                      }`}
                    />
                    <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-neutral-800 mb-2">
                    연락처 <span className="text-[#FF6B24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="010-1234-5678"
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B24]/40 ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#E6E6E3] focus:border-[#FF6B24]'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <label htmlFor="program" className="block text-xs font-bold text-neutral-800 mb-2">
                  희망 프로그램 <span className="text-[#FF6B24]">*</span>
                </label>
                <select
                  id="program"
                  value={formData.program}
                  onChange={(e) => {
                    setFormData({ ...formData, program: e.target.value });
                    if (errors.program) setErrors({ ...errors, program: undefined });
                  }}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:ring-2 focus:ring-[#FF6B24]/40 bg-white transition-colors text-neutral-900"
                >
                  {INITIAL_PROGRAMS.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.code} · {p.title} ({p.target})
                    </option>
                  ))}
                  <option value="1:1 상담 후 추천">아직 잘 모르겠어요 (코치 상담 후 결정)</option>
                </select>
                {errors.program && <p className="text-xs text-red-500 mt-1.5">{errors.program}</p>}
              </div>

              {/* Date and Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-xs font-bold text-neutral-800 mb-2">
                    희망 방문 날짜 <span className="text-[#FF6B24]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      min={minDateStr}
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (errors.date) setErrors({ ...errors, date: undefined });
                      }}
                      className={`w-full px-4 py-3 text-sm rounded-xl border transition-colors bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B24]/40 ${
                        errors.date ? 'border-red-500 bg-red-50/20' : 'border-[#E6E6E3] focus:border-[#FF6B24]'
                      }`}
                    />
                    <Calendar className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.date && <p className="text-xs text-red-500 mt-1.5">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="timeSlot" className="block text-xs font-bold text-neutral-800 mb-2">
                    희망 시간대 <span className="text-[#FF6B24]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="timeSlot"
                      value={formData.timeSlot}
                      onChange={(e) => {
                        setFormData({ ...formData, timeSlot: e.target.value });
                        if (errors.timeSlot) setErrors({ ...errors, timeSlot: undefined });
                      }}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:ring-2 focus:ring-[#FF6B24]/40 bg-white transition-colors text-neutral-900"
                    >
                      {timeSlotOptions.map((time, idx) => (
                        <option key={idx} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <Clock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.timeSlot && <p className="text-xs text-red-500 mt-1.5">{errors.timeSlot}</p>}
                </div>
              </div>

              {/* Inquiry textarea */}
              <div>
                <label htmlFor="inquiry" className="block text-xs font-bold text-neutral-800 mb-2">
                  추가 문의사항 <span className="text-neutral-400 font-normal">(선택)</span>
                </label>
                <div className="relative">
                  <textarea
                    id="inquiry"
                    rows={3}
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    placeholder="운동 경험 여부, 희망 목표, 특별히 궁금하신 점을 편하게 남겨주세요."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#E6E6E3] focus:border-[#FF6B24] focus:ring-2 focus:ring-[#FF6B24]/40 bg-white transition-colors"
                  />
                  <MessageSquare className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Privacy agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => {
                      setFormData({ ...formData, agreePrivacy: e.target.checked });
                      if (errors.agreePrivacy) setErrors({ ...errors, agreePrivacy: undefined });
                    }}
                    className="w-4 h-4 mt-0.5 rounded border-[#E6E6E3] text-[#FF6B24] focus:ring-[#FF6B24]"
                  />
                  <div className="text-xs text-neutral-600 leading-normal">
                    <span>[필수] 무료 체험 일정 안내 및 상담을 위한 </span>
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-[#FF6B24] font-semibold underline hover:text-[#E85A16]"
                    >
                      개인정보 수집 및 이용
                    </button>
                    <span>에 동의합니다.</span>
                  </div>
                </label>
                {errors.agreePrivacy && (
                  <p className="text-xs text-red-500 mt-1.5">{errors.agreePrivacy}</p>
                )}
              </div>

              {/* Submit CTA button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 text-base font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] active:bg-[#D94F0E] rounded-xl shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B24] whitespace-nowrap"
                >
                  <Send className="w-5 h-5" />
                  <span>신청 내용 확인 및 접수하기</span>
                </button>
                <p className="text-center text-[11px] text-neutral-400 mt-3">
                  제출 전 최종 입력 내용을 검토하는 단계가 진행됩니다.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Pre-Submission Confirmation Dialog */}
      {showConfirmModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3EB] text-[#FF6B24] flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#171717] mb-1">
              신청 내용을 확인해 주세요
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              아래 정보로 무료 체험 상담 접수를 진행할까요?
            </p>

            <div className="bg-[#F5F5F3] rounded-xl p-4 space-y-2 text-xs text-neutral-700 mb-6 border border-[#E6E6E3]">
              <div className="flex justify-between">
                <span className="text-neutral-500">성함</span>
                <span className="font-bold text-neutral-900">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">연락처</span>
                <span className="font-bold text-neutral-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">프로그램</span>
                <span className="font-bold text-[#FF6B24]">{formData.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">방문 일정</span>
                <span className="font-bold text-neutral-900">{formData.date} / {formData.timeSlot}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 text-xs font-bold text-white bg-[#FF6B24] hover:bg-[#E85A16] rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? '확인 중...' : '최종 접수하기'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
