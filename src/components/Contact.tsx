import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact: React.FC = () => {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-portfolio-blue-dark mb-3">
          Vamos Trabalhar Juntos
        </h2>
        <div className="h-1 w-20 bg-portfolio-blue mx-auto mb-6"></div>
        <p className="text-portfolio-gray-dark mb-12 max-w-2xl mx-auto">
          Estou disponível para novos projetos e oportunidades. 
          Entre em contato para conversarmos sobre como posso ajudar a 
          transformar suas ideias em experiências digitais impactantes.
        </p>
      </motion.div>
      
      <div className="max-w-md mx-auto">
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Botão Email */}
          <Button
            variant="default"
            className="group bg-portfolio-blue hover:bg-portfolio-blue-dark transition-colors w-full py-6 h-auto text-base rounded-xl shadow-lg shadow-portfolio-blue/10 flex items-center justify-center gap-3"
            asChild
          >
            <a
              href="mailto:tbisp0@hotmail.com"
              className="flex items-center gap-3 w-full"
            >
              <div className="bg-white/20 p-2 rounded-lg">
                <Mail size={28} className="w-8 h-8" />
              </div>
              <span className="font-medium">Enviar Email</span>
              <ArrowRight size={28} className="ml-auto transition-transform group-hover:translate-x-1 duration-300 w-8 h-8" />
            </a>
          </Button>
          {/* Link Gmail discreto */}
          <div className="flex justify-end -mt-2 mb-2">
            <a
              href="https://mail.google.com/mail/?view=cm&to=tbisp0@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-portfolio-blue underline hover:text-portfolio-blue-dark transition-colors"
            >
              Ou envie pelo Gmail
            </a>
          </div>
          {/* Botão LinkedIn */}
          <Button
            variant="outline"
            className="group border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white transition-colors w-full py-6 h-auto text-base rounded-xl flex items-center justify-center gap-3"
            asChild
          >
            <a
              href="https://www.linkedin.com/in/tarcisiobispouxdesigner/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full"
            >
              <div className="bg-portfolio-blue/10 p-2 rounded-lg text-portfolio-blue group-hover:bg-white/20 group-hover:text-white transition-colors">
                <Linkedin size={28} className="w-8 h-8" />
              </div>
              <span className="font-medium">Conectar no LinkedIn</span>
              <ArrowRight size={28} className="ml-auto transition-transform group-hover:translate-x-1 duration-300 w-8 h-8" />
            </a>
          </Button>
          {/* Botão Download Currículo */}
          <Button
            variant="ghost"
            className="group bg-slate-50 hover:bg-slate-100 text-portfolio-gray-dark transition-colors w-full py-6 h-auto text-base rounded-xl flex items-center justify-center gap-3"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1NgQorqxUXbGKUaDruLfflxB4_6GhJyo8/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full"
            >
              <div className="bg-slate-200 p-2 rounded-lg">
                <Download size={28} className="w-8 h-8" />
              </div>
              <span className="font-medium">Download Currículo</span>
              <ArrowRight size={28} className="ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-300 w-8 h-8" />
            </a>
          </Button>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center opacity-60 text-sm text-portfolio-gray-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Tarcisio Bispo de Araujo</p>
          <p>UX/Product Designer</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
