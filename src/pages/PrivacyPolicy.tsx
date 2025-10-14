import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6"
            >
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            
            {/* Introdução */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{t('privacy.introduction.title')}</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('privacy.introduction.content')}
              </p>
            </section>

            {/* Dados Coletados */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{t('privacy.dataCollection.title')}</h2>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 {t('privacy.dataCollection.formData.title')}</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.formData.contactForm')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.formData.feedbackForm')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.formData.newsletter')}</strong></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">2.2 {t('privacy.dataCollection.technicalData.title')}</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.technicalData.navigation')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.technicalData.cookies')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.technicalData.analytics')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataCollection.technicalData.performance')}</strong></li>
              </ul>
            </section>

            {/* Finalidades */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{t('privacy.dataUsage.title')}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.dataUsage.purposes.professional')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Responder solicitações, enviar propostas comerciais, manter relacionamento profissional
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.dataUsage.purposes.improvement')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Analisar feedback, otimizar experiência do usuário, desenvolver novos recursos
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.dataUsage.purposes.personalization')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Salvar preferências de tema, idioma e acessibilidade para melhor experiência
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.dataUsage.purposes.security')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Prevenir fraudes, detectar atividades suspeitas, garantir integridade dos dados
                  </p>
                </div>
              </div>
            </section>

            {/* Base Legal */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.legalBasis.title')}</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li><strong className="text-gray-900 dark:text-white">{t('privacy.legalBasis.articles.consent')}</strong></li>
                  <li><strong className="text-gray-900 dark:text-white">{t('privacy.legalBasis.articles.legitimate')}</strong></li>
                  <li><strong className="text-gray-900 dark:text-white">{t('privacy.legalBasis.articles.contract')}</strong></li>
                  <li><strong className="text-gray-900 dark:text-white">{t('privacy.legalBasis.articles.rights')}</strong></li>
                </ul>
              </div>
            </section>

            {/* Compartilhamento */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.dataSharing.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Seus dados pessoais podem ser compartilhados apenas nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataSharing.cases.serviceProviders')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataSharing.cases.legal')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataSharing.cases.rights')}</strong></li>
                <li><strong className="text-gray-900 dark:text-white">{t('privacy.dataSharing.cases.consent')}</strong></li>
              </ul>
            </section>

            {/* Seus Direitos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. {t('privacy.dataRights.title')}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.dataRights.rights')}</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Confirmação da existência de tratamento</li>
                    <li>• Acesso aos dados</li>
                    <li>• Correção de dados incompletos/inexatos</li>
                    <li>• Anonimização, bloqueio ou eliminação</li>
                    <li>• Portabilidade dos dados</li>
                    <li>• Eliminação dos dados tratados com consentimento</li>
                    <li>• Revogação do consentimento</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('privacy.exerciseRights.howTo')}</h4>
                  <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{t('privacy.exerciseRights.contact')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+55 (19) 99013-7380</span>
                    </div>
                    <p className="mt-2">{t('privacy.exerciseRights.response')}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Segurança */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Segurança dos Dados</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300">
                  <li>• Criptografia HTTPS/SSL</li>
                  <li>• Controle de acesso restrito</li>
                  <li>• Monitoramento de segurança</li>
                  <li>• Backups regulares</li>
                  <li>• Atualizações de segurança</li>
                  <li>• Treinamento da equipe</li>
                </ul>
              </div>
            </section>

            {/* Retenção */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.dataRetention.title')}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">{t('privacy.dataRetention.table.dataType')}</th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left">{t('privacy.dataRetention.table.retention')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.types.contact')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.periods.contact')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.types.feedback')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.periods.feedback')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.types.analytics')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.periods.analytics')}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.types.preferences')}</td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3">{t('privacy.dataRetention.periods.preferences')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('privacy.cookies.title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Utilizamos cookies e localStorage para melhorar sua experiência:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('privacy.cookies.essential')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{t('privacy.cookies.essentialDesc')}</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t('privacy.cookies.performance')}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{t('privacy.cookies.performanceDesc')}</p>
                </div>
              </div>
            </section>

            {/* Transferência Internacional */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Transferência Internacional</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Alguns de nossos prestadores de serviço podem estar localizados fora do Brasil (Google, EmailJS).
                Garantimos que essas transferências atendem aos requisitos da LGPD e GDPR, com cláusulas contratuais
                padrão e certificações adequadas de proteção de dados.
              </p>
            </section>

            {/* Alterações */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Alterações nesta Política</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas
                através do e-mail cadastrado ou aviso no site. Recomendamos revisar esta página regularmente.
              </p>
            </section>

            {/* Contato DPO */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Encarregado de Dados (DPO)</h2>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Para questões relacionadas à proteção de dados, entre em contato:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span><strong className="text-gray-900 dark:text-white">{t('privacy.contact.email')}</strong> {t('privacy.contact.values.email')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span><strong className="text-gray-900 dark:text-white">{t('privacy.contact.phone')}</strong> {t('privacy.contact.values.phone')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span><strong className="text-gray-900 dark:text-white">{t('privacy.contact.location')}</strong> {t('privacy.contact.values.location')}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Rodapé */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6 mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Esta política está em conformidade com a LGPD (Lei 13.709/2018), GDPR (Regulamento UE 2016/679),
                CCPA (California Consumer Privacy Act) e outras legislações aplicáveis de proteção de dados.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{t('privacy.lastUpdated')}: {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
