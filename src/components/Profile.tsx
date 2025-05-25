import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import IxDFLogo from '@/components/ui/IxDFLogo';
import TypewriterText from '@/components/ui/TypewriterText';
import { Download, Linkedin, ArrowRight, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getProfileImagePaths } from '@/utils/assetPaths';

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center justify-center">
        {/* Card da foto */}
        <motion.div
          className="lg:col-span-4 flex flex-col items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="profile-image-container">
            <picture>
              <source srcSet={profileImages.webp} type="image/webp" />
              <img
                src={profileImages.png}
                alt={t('alts.profile.photo')}
                className="profile-image"
                loading="eager"
                fetchPriority="high"
                width="256"
                height="256"
                decoding="sync"
                style={{
                  contentVisibility: 'auto',
                  containIntrinsicSize: '256px 256px'
                }}
              />
            </picture>
          </div>

          {/* Informações abaixo da foto */}
          <div className="flex flex-col items-center text-center space-y-4 mt-8 lg:mt-6 w-full">

            {/* Nome + Logo IxDF */}
            <div className="flex flex-col items-center gap-4">
              <p className="profile-name">
                {t('profile.name')}
              </p>

              {/* Logo IxDF com texto explicativo */}
              <div className="flex items-center gap-1">
                <IxDFLogo
                  size="sm"
                  showText={false}
                  className="opacity-90 hover:opacity-100 transition-opacity duration-300"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {t('profile.ixdf')}
                </span>
              </div>
            </div>

            {/* Informações de Contato Centralizadas */}
            <div className="flex flex-col items-center space-y-4 text-sm">

              {/* Localização */}
              <div className="flex items-center gap-3 min-w-0">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} aria-hidden="true" />
                <span style={{ color: "var(--color-muted)" }}>
                  Campinas, SP, Brasil
                </span>
              </div>

              {/* E-mail */}
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} aria-hidden="true" />
                <a
                  href="mailto:tbisp0@hotmail.com"
                  className="hover:underline transition-all duration-300"
                  style={{ color: "var(--color-muted)" }}
                  aria-label="Enviar e-mail para tbisp0@hotmail.com"
                >
                  tbisp0@hotmail.com
                </a>
              </div>

              {/* Telefone */}
              <div className="flex items-center gap-3 min-w-0">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-primary)" }} aria-hidden="true" />
                <a
                  href="tel:+5519990137380"
                  className="hover:underline transition-all duration-300"
                  style={{ color: "var(--color-muted)" }}
                  aria-label="Ligar para +55 19 99013-7380"
                >
                  +55 (19) 99013-7380
                </a>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          className="lg:col-span-8 flex flex-col text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 id="profile-title" className="break-words text-left mb-6 text-4xl lg:text-5xl font-bold">
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
              className="text-[var(--color-primary)]"
              speed={50}
              repeat={0}
            />
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1.5 mb-8 rounded"
            style={{ background: "var(--color-secondary)" }}
          ></motion.div>
          <p id="profile-description" className="text-lead max-w-3xl text-left mb-8">
            {t('profile.bio')}
          </p>
          {/* Botões CTA Modernos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-start">

            {/* CTA Principal - Vamos Conversar */}
            <CTAButton
              href="https://wa.me/19990137380"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={MessageCircle}
              iconPosition="left"
              ariaLabel="Iniciar conversa no WhatsApp com Tarcisio Bispo para discutir projetos de UX Design"
              className="bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#25D366] focus:ring-green-400"
            >
              {t('profile.letsChat')}
            </CTAButton>

            {/* CTA Ghost - Download CV */}
            <CTAButton
              href="https://drive.google.com/file/d/1NgQorqxUXbGKUaDruLfflxB4_6GhJyo8/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              icon={Download}
              iconPosition="left"
              ariaLabel="Baixar currículo em PDF de Tarcisio Bispo, UX Designer com experiência em Design de Interação"
            >
              {t('profile.downloadCV')}
            </CTAButton>

            {/* CTA Ghost - LinkedIn */}
            <CTAButton
              href="https://www.linkedin.com/in/tarcisiobispouxdesigner/"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="lg"
              icon={Linkedin}
              iconPosition="left"
              ariaLabel="Visitar perfil profissional de Tarcisio Bispo no LinkedIn para ver experiência e conexões"
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
