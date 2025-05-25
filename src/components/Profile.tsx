import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import IxDFLogo from '@/components/ui/IxDFLogo';
import TypewriterText from '@/components/ui/TypewriterText';
import { Download, Linkedin, ArrowRight, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProfileImagePaths } from '@/utils/assetPaths';
import '@/styles/profile-card.css';

// Ícone do WhatsApp
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
}

const Profile: React.FC<ProfileProps> = ({ name }) => {
  const { t } = useTranslation();
  const profileImages = getProfileImagePaths();

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden" aria-labelledby="profile-title">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center justify-center max-w-7xl mx-auto px-6">

        {/* CARD DE PERFIL PREMIUM - Melhor que LinkedIn */}
        <motion.div
          className="lg:col-span-4 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative group">
            {/* Card Container com Glassmorphism */}
            <div className="profile-card relative rounded-3xl p-8 max-w-sm w-full transition-all duration-500">

              {/* Background Gradient Sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20 rounded-3xl"></div>

              {/* Foto de Perfil com Efeitos */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                  {/* Anel Animado */}
                  <div className="profile-ring absolute -inset-1 rounded-full opacity-75 group-hover:opacity-100"></div>

                  {/* Container da Foto */}
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white p-1 shadow-xl">
                    <picture>
                      <source srcSet={profileImages.webp} type="image/webp" />
                      <img
                        src={profileImages.png}
                        alt={t('alts.profile.photo')}
                        className="profile-image-hover w-full h-full object-cover rounded-full"
                        loading="eager"
                        fetchPriority="high"
                        width="128"
                        height="128"
                        decoding="sync"
                      />
                    </picture>
                  </div>

                  {/* Status Online */}
                  <div className="status-online absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                {/* Nome e Título */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('profile.name')}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-3">
                    UX/Product Designer
                  </p>

                  {/* IxDF Badge */}
                  <div className="ixdf-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full">
                    <IxDFLogo
                      size="sm"
                      showText={false}
                      className="w-4 h-4"
                    />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      {t('profile.ixdf')}
                    </span>
                  </div>
                </div>

                {/* Informações de Contato */}
                <div className="space-y-3 w-full">
                  {/* Localização */}
                  <div className="contact-item flex items-center gap-3 p-2 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Campinas, SP, Brasil
                    </span>
                  </div>

                  {/* E-mail */}
                  <a
                    href="mailto:tbisp0@hotmail.com"
                    className="contact-item flex items-center gap-3 p-2 rounded-lg group"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-green-600 dark:text-green-400" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      tbisp0@hotmail.com
                    </span>
                  </a>

                  {/* Telefone */}
                  <a
                    href="tel:+5519990137380"
                    className="contact-item flex items-center gap-3 p-2 rounded-lg group"
                  >
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      +55 (19) 99013-7380
                    </span>
                  </a>
                </div>

                {/* Botão CTA Principal */}
                <div className="mt-6 w-full">
                  <CTAButton
                    href="https://wa.me/19990137380"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    icon={MessageCircle}
                    iconPosition="left"
                    className="card-cta w-full justify-center"
                  >
                    {t('profile.letsChat')}
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Section Moderna */}
        <motion.div
          className="lg:col-span-8 flex flex-col justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Título Principal com Typewriter */}
          <div className="mb-8">
            <h1 id="profile-title" className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-gray-900 dark:text-white">Olá, eu sou </span>
              <br />
              <TypewriterText
                sequence={[
                  'UX Designer',
                  2000,
                  'Product Designer',
                  2000,
                  'Design Strategist',
                  2000,
                  'Interaction Designer',
                  2000
                ]}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                speed={50}
                repeat={0}
              />
            </h1>

            {/* Linha Animada */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
            ></motion.div>
          </div>

          {/* Bio Text */}
          <div className="mb-8">
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {t('profile.bio')}
            </p>
          </div>

          {/* CTAs Secundários */}
          <div className="flex flex-col sm:flex-row gap-4">
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
            >
              {t('profile.linkedin')}
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
