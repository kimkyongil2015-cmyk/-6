/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { Pricing } from './components/Pricing';
import { Gallery } from './components/Gallery';
import { TrialForm } from './components/TrialForm';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { OperatorSettingsModal } from './components/OperatorSettingsModal';
import { INITIAL_GYM_SETTINGS, GymSettings } from './data/gymData';

export default function App() {
  const [settings, setSettings] = useState<GymSettings>(() => {
    try {
      const saved = localStorage.getItem('funfun_boxing_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GYM_SETTINGS;
  });

  const [selectedProgram, setSelectedProgram] = useState<string>('입문 복싱');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSaveSettings = (newSettings: GymSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('funfun_boxing_settings', JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  const scrollToTrial = (programName?: string) => {
    if (programName) {
      setSelectedProgram(programName);
    }
    const trialSection = document.getElementById('trial');
    if (trialSection) {
      const topOffset = 70;
      const pos = trialSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: pos - topOffset,
        behavior: 'smooth',
      });
    }
  };

  const scrollToPrograms = () => {
    const progSection = document.getElementById('programs');
    if (progSection) {
      const topOffset = 70;
      const pos = progSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: pos - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#292929] selection:bg-[#FF6B24] selection:text-white flex flex-col">
      {/* SECTION 1. Header & Navigation (Fixed Sticky Top Bar Contract) */}
      <Header
        onOpenTrial={() => scrollToTrial()}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      <main className="flex-1">
        {/* SECTION 2. Main Hero */}
        <Hero
          onOpenTrial={() => scrollToTrial()}
          onExplorePrograms={scrollToPrograms}
        />

        {/* SECTION 3. Introduction & 3 Core Pillars */}
        <About onOpenTrial={() => scrollToTrial()} />

        {/* SECTION 4. Boxing Programs (4 Curriculums) */}
        <Programs onSelectProgramForTrial={(progName) => scrollToTrial(progName)} />

        {/* SECTION 5. Pricing & Membership */}
        <Pricing onSelectPlanForInquiry={(planName) => scrollToTrial(`${planName} 상담`)} />

        {/* SECTION 6. Facility Gallery (with zoom modal) */}
        <Gallery />

        {/* SECTION 7. Free Trial Application (Lead Conversion with honest test mode) */}
        <TrialForm
          key={selectedProgram}
          initialProgram={selectedProgram}
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />

        {/* SECTION 8. Location & Directions */}
        <Location
          settings={settings}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
        />
      </main>

      {/* SECTION 9. Final CTA & Footer */}
      <Footer
        settings={settings}
        onOpenTrial={() => scrollToTrial()}
        onExplorePrograms={scrollToPrograms}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Modals */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <OperatorSettingsModal
        isOpen={isSettingsModalOpen}
        currentSettings={settings}
        onSave={handleSaveSettings}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
