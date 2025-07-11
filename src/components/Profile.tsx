import React, { Suspense, useState, useEffect } from 'react';
import { OptimizedMotion } from '@/components/LazyMotion';
import CTAButton from '@/components/ui/CTAButton';
import IxDFLogo from '@/components/ui/IxDFLogo';
import TypewriterText from '@/components/ui/TypewriterText';
import CriticalBio from '@/components/CriticalBio';
import CLSOptimizedImage from '@/components/CLSOptimizedImage';
import { Download, Linkedin, ArrowRight, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProfileImagePaths } from '@/utils/assetPaths';
import { useTypewriterLCPOptimization } from '@/hooks/useLCPOptimization';
import { ProfileSkeleton } from '@/components/ui/ProjectSkeleton';
import '@/styles/profile-card.css';

// WhatsApp Icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M16.7 13.6c-.3-.2-1.7-.8-2-1s-.5-.2-.7.1c-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.2 0-.4 0-.6s-.7-1.7-.9-2.3c-.2-.6-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.7.7-.7 1.7 0 1 .7 2.1 1.1 2.6.4.5 2.1 2.8 5.1 3.7.7.2 1.2.3 1.6.2.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2z"
      fill="white"
    />
    <path
      d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.3C8.3 21.5 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.7 0-3.3-.4-4.7-1.2l-.3-.2-2.8.7.7-2.7-.2-.3C4.4 15.3 4 13.7 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8z"
      fill="white"
    />
  </svg>
);

interface ProfileProps {
  name: string;
  loading?: boolean;
}

const Profile: React.FC<ProfileProps> = ({ name, loading: externalLoading = false }) => {
  const { t } = useTranslation();
  const profileImages = getProfileImagePaths();
  const { showTypewriter, isLCPComplete } = useTypewriterLCPOptimization();
  const [loading, setLoading] = useState(externalLoading);
  
  // Simular carregamento se necessário
  useEffect(() => {
    if (externalLoading) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [externalLoading]);

  if (loading) {
    return (
      <section className="min-h-screen flex flex-col justify-center py-8 relative" aria-labelledby="profile-title">
        <div className="max-w-7xl mx-auto px-6">
          <ProfileSkeleton />
        </div>
      </section>
    );
  }
  
  return (
    <section className="min-h-screen flex flex-col justify-center py-16 relative" aria-labelledby="profile-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center justify-center max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* PREMIUM PROFILE CARD */}
        <div
          className="lg:col-span-4 flex justify-center relative z-10"
          style={{ overflow: 'visible' }}
        >
          <div className="relative group p-8">
            {/* Card Container */}
            <div className="profile-card relative rounded-3xl px-6 py-10 max-w-sm w-full overflow-hidden transition-all duration-500">

              {/* Subtle Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20 rounded-3xl"></div>

              {/* COMPLETE STRUCTURE WITH CORRECT SPACING */}
              <div className="relative z-10 flex flex-col items-center space-y-8">

                {/* SECTION 1: Profile Photo */}
                <div className="relative">
                  {/* Animated Ring */}
                  <div className="profile-ring absolute -inset-1 rounded-full opacity-75 group-hover:opacity-100"></div>

                  {/* Photo Container */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white p-1 shadow-xl">
                    <CLSOptimizedImage
                      src={profileImages.png}
                      webpSrc={profileImages.webp}
                      alt={t('alts.profile.photo')}
                      width={128}
                      height={128}
                      priority={true} // Keep priority to ensure it loads quickly
                      className="profile-image-hover rounded-full"
                    />
                  </div>

                  {/* Online Status */}
                  <div className="status-online absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                {/* SECTION 2: Personal Information */}
                <div className="text-center space-y-4 w-full">
                  {/* Name */}
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                    {t('profile.name')}
                  </h2>

                  {/* Professional Title - WCAG 2.2 AA Compliant */}
                  <p className="text-blue-700 dark:text-blue-300 font-medium text-sm leading-relaxed">
                    {t('profile.jobTitle')}
                  </p>

                  {/* Location - WCAG 2.2 AA Compliant */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('profile.location')}
                  </p>

                  {/* Phone - WCAG 2.2 AA Compliant */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {t('profile.phone')}
                  </p>
                </div>

                {/* SECTION 3: IxDF Badge - WCAG 2.2 AA Compliant */}
                <div className="flex items-center justify-center gap-3 text-xs text-gray-800 dark:text-gray-200 px-4 py-2 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    <IxDFLogo
                      size="sm"
                      showText={false}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Correct spacing between icon and text */}
                  <span className="whitespace-nowrap font-medium ml-1">{t('profile.ixdf')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section - LCP Optimized */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          {/* Main Title - Immediate Rendering for LCP */}
          <div className="mb-8">
            <h1
              id="profile-title"
              className="text-4xl lg:text-6xl font-bold mb-8 leading-tight text-left"
              style={{
                contentVisibility: 'visible',
                containIntrinsicSize: 'auto 200px',
                willChange: 'auto',
                transform: 'translateZ(0)',
                contain: 'layout style paint'
              }}
            >
              <span className="text-gray-900 dark:text-white">{t('profile.greeting')}</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {showTypewriter ? (
                  <Suspense fallback={t('profile.role1')}>
                    <TypewriterText
                      sequence={[
                        t('profile.role1'),
                        2000,
                        t('profile.role2'),
                        2000,
                        t('profile.role3'),
                        2000,
                        t('profile.role4'),
                        2000
                      ]}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                      speed={50}
                      repeat={0}
                      preRenderFirstString={true}
                    />
                  </Suspense>
                ) : (
                  t('profile.role1')
                )}
              </span>
            </h1>

            {/* Decorative Line - Immediate Rendering */}
            <div className="h-1 w-[120px] bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8"></div>
          </div>

          {/* Bio Text - Critical for LCP */}
          <CriticalBio />

          {/* Main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {/* Main CTA - Let's Chat */}
            <CTAButton
              href="https://wa.me/19990137380"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={MessageCircle}
              iconPosition="left"
              className="bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#25D366] focus:ring-green-400"
              aria-label={t('profile.chatWhatsApp')}
            >
              {t('profile.letsChat')}
            </CTAButton>

            {/* Download CV */}
            <CTAButton
              href="https://drive.google.com/file/d/1NgQorqxUXbGKUaDruLfflxB4_6GhJyo8/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              icon={Download}
              iconPosition="left"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={t('profile.downloadResume')}
            >
              {t('profile.downloadCV')}
            </CTAButton>

            {/* LinkedIn */}
            <CTAButton
              href="https://www.linkedin.com/in/tarcisiobispouxdesigner/"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              icon={Linkedin}
              iconPosition="left"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={t('profile.accessLinkedIn')}
            >
              {t('profile.linkedin')}
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
