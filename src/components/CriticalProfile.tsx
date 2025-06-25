import React from 'react';
import { getProfileImagePaths } from '@/utils/assetPaths';
import { useTranslation } from 'react-i18next';

/**
 * Critical Profile Component - Optimized for LCP
 * This component contains only the essential above-the-fold content
 * to improve Largest Contentful Paint performance
 * Now using i18next for all text content
 */
const CriticalProfile: React.FC = () => {
  const profileImages = getProfileImagePaths();
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Profile Image - LCP Element */}
        <div className="lg:col-span-4 flex justify-center">
          <div className="relative">
            <div className="w-full max-w-xs aspect-square rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden">
              <picture>
                <source srcSet={profileImages.webp} type="image/webp" />
                <img
                  src={profileImages.png}
                  alt={t('alts.profile.photo')}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="256"
                  height="256"
                  decoding="sync"
                  style={{
                    contentVisibility: 'visible',
                    containIntrinsicSize: '256px 256px'
                  }}
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Critical Text Content */}
        <div className="lg:col-span-8 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
            <span className="text-[var(--color-primary)]">{t('profile.jobTitle')}</span>
          </h1>

          <div className="h-1.5 w-32 bg-[var(--color-secondary)] rounded mb-6 mx-auto lg:mx-0"></div>

          <p className="text-lg text-[var(--color-text)] max-w-2xl mb-8 leading-relaxed">
            {t('profile.bio')}
          </p>

          {/* Critical CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="https://wa.me/19990137380"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white font-medium rounded-lg hover:bg-[#1ebe5d] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('profile.letsChat')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CriticalProfile;
