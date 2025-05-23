import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, ArrowRight } from 'lucide-react';

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
  title: string;
  bio: string;
}

const Profile: React.FC<ProfileProps> = ({ name, title, bio }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-16 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center justify-center">
        {/* Card da foto */}
        <motion.div
          className="lg:col-span-4 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center mb-6 lg:mb-0 w-full">
            <div className="w-64 h-64 rounded-full border-4 border-white shadow-2xl bg-white overflow-hidden hover:scale-105 transition-transform duration-300 mx-auto">
              <img
                src="/portfolio/images/tarcisio_bispo.png"
                alt="Foto de Tarcisio Bispo de Araujo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          className="lg:col-span-8 flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-3 leading-tight break-words" style={{ color: "var(--color-primary)" }}>
            {name}
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-1.5 mb-6 rounded"
            style={{ background: "var(--color-secondary)" }}
          ></motion.div>
          <h2 className="text-2xl md:text-3xl mb-8 font-semibold" style={{ color: "var(--color-secondary)" }}>
            {title}
          </h2>
          <p className="leading-relaxed mb-10 max-w-3xl text-lg md:text-xl" style={{ color: "var(--color-muted)" }}>
            {bio}
          </p>
          {/* Botões */}
          <div className="flex flex-wrap gap-6">
            <Button
              style={{ backgroundColor: "#25D366" }}
              className="group text-white hover:bg-[#1ebe5d] transition-all duration-300 rounded-full pl-7 pr-6 py-4 text-lg"
              asChild
            >
              <a href="https://wa.me/19990137380" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <WhatsAppIcon className="mr-3" width={24} height={24} /> {/* Corrigido: sem w-8 h-8 */}
                <span>Vamos Conversar</span>
                <ArrowRight size={28} className="ml-2 transition-transform group-hover:translate-x-1 duration-300" />
              </a>
            </Button>
            <Button
              variant="default"
              className="group bg-portfolio-blue hover:bg-portfolio-blue-dark text-white transition-all duration-300 rounded-full pl-7 pr-6 py-4 text-lg"
              asChild
            >
              <a
                href="https://drive.google.com/file/d/1NgQorqxUXbGKUaDruLfflxB4_6GhJyo8/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={28} className="mr-3 w-8 h-8" />
                <span>Download CV</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              className="group bg-transparent hover:bg-portfolio-blue/10 text-portfolio-blue transition-all duration-300 rounded-full pl-7 pr-6 py-4 text-lg"
              asChild
            >
              <a href="https://www.linkedin.com/in/tarcisiobispouxdesigner/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={28} className="mr-3 w-8 h-8" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
