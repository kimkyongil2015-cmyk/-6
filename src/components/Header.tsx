import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Dumbbell } from 'lucide-react';

interface HeaderProps {
  onOpenTrial: (programId?: string) => void;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTrial }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '프로그램', href: '#programs' },
    { label: '시설 안내', href: '#gallery' },
    { label: '오시는 길', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E6E6E3]'
          : 'bg-white/80 backdrop-blur-sm border-b border-[#E6E6E3]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B24] rounded-md"
          >
            <div className="w-9 h-9 rounded-lg bg-[#FF6B24] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-extrabold text-xl tracking-tight text-[#171717]">
                  <span className="text-[#FF6B24]">펀펀</span> 복싱
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 font-mono hidden sm:inline">
                  BOXING
                </span>
              </div>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[15px] font-medium text-[#292929] hover:text-[#FF6B24] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#FF6B24]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenTrial()}
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 text-sm font-semibold text-white bg-[#FF6B24] hover:bg-[#E85A16] active:bg-[#D94F0E] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B24]"
            >
              <span>무료 체험 신청</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B24]"
              aria-expanded={mobileMenuOpen}
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6E6E3] px-5 py-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-neutral-800 hover:text-[#FF6B24] hover:bg-[#FFF3EB] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-neutral-100 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#FF6B24] hover:bg-[#E85A16] rounded-lg transition-colors"
              >
                <span>무료 체험 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
