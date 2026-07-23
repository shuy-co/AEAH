import { useState } from 'react'
import {
  Briefcase,
  Building,
  CalendarCheck,
  CheckCircle,
  Download,
  GraduationCap,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import type { BenefitItem } from '../types'
import section from './section.module.css'
import styles from './Benefits.module.css'

const MEMBER_BENEFITS: BenefitItem[] = [
  {
    id: 'm1',
    title: 'Planos de Saúde & Odontológicos',
    description:
      'Acesso a planos de saúde coletivos por adesão com descontos de até 40% em relação ao plano individual comum.',
    icon: <Heart size={24} />,
    details: [
      'Parcerias com Unimed Campinas, SulAmérica e Amil.',
      'Planos odontológicos com cobertura nacional (OdontoPrev, SulAmérica).',
      'Extensível para dependentes diretos (cônjuges e filhos).',
      'Isenção parcial de carências conforme período de adesão.',
    ],
  },
  {
    id: 'm2',
    title: 'Convênios Educacionais (Graduação & Pós)',
    description:
      'Bolsas de estudo exclusivas de 15% a 50% em cursos de engenharia, agronomia, pós-graduação e escolas de idiomas.',
    icon: <GraduationCap size={24} />,
    details: [
      'Descontos especiais na UNIP, USF, Mackenzie, FACAMP e Anhanguera.',
      'Descontos em MBAs de Gerenciamento de Projetos e Engenharia de Software.',
      'Escolas de idiomas parceiras com até 35% de desconto.',
      'Cursos técnicos de especialização recomendados pelo CREA-SP.',
    ],
  },
  {
    id: 'm3',
    title: 'Orientação Técnica & Suporte CREA-SP',
    description:
      'Auxílio completo para preenchimento de ARTs, regularização de registros profissionais e esclarecimento de dúvidas sobre fiscalização.',
    icon: <ShieldCheck size={24} />,
    details: [
      'Esclarecimento técnico de preenchimento da ART.',
      'Orientação jurídica preliminar para contratos de prestação de serviços.',
      'Intermediação institucional para agilizar certidões junto ao CREA-SP.',
      'Consultoria para recém-formados entrarem no mercado legalizado.',
    ],
  },
  {
    id: 'm4',
    title: 'Networking & Integração Setorial',
    description:
      'Participação prioritária em eventos fechados de integração e contato direto com as indústrias do polo tecnológico de Hortolândia.',
    icon: <Users size={24} />,
    details: [
      'Acesso livre aos encontros mensais de negócios (Cafés com Engenharia).',
      'Desconto garantido no Jantar Anual dos Profissionais.',
      'Inclusão no catálogo de recomendação de profissionais da AEAH.',
      'Contato com gestores de infraestrutura de multinacionais da região.',
    ],
  },
]

const GENERAL_BENEFITS: BenefitItem[] = [
  {
    id: 'g1',
    title: 'Banco Público de Profissionais Certificados',
    description:
      'Espaço onde moradores, comerciantes e empresários de Hortolândia podem buscar engenheiros e agrônomos qualificados para seus projetos.',
    icon: <Briefcase size={24} />,
    details: [
      'Ferramenta pública de consulta para contratar responsáveis técnicos.',
      'Garantia de registro regularizado no CREA para todos os listados.',
      'Filtragem por especialidade (Estrutural, Agronômico, Elétrico, Ambiental).',
      'Solicitação de orçamentos diretamente pela plataforma.',
    ],
  },
  {
    id: 'g2',
    title: 'Palestras Técnicas e Eventos Abertos',
    description:
      'Acesso a palestras, feiras e mesas-redondas gratuitas com foco no desenvolvimento urbano, segurança nas obras e técnicas agronômicas.',
    icon: <CalendarCheck size={24} />,
    details: [
      'Palestras de engenharia sustentável e sistemas fotovoltaicos.',
      'Painéis de inovações agrícolas para produtores locais.',
      'Campanhas de responsabilidade social com arrecadação de alimentos.',
      'Apoio didático sobre engenharia e agronomia nas escolas técnicas.',
    ],
  },
  {
    id: 'g3',
    title: 'Downloads de Guias de Aprovação',
    description:
      'Modelos e cartilhas gratuitas de orientação sobre aprovação de projetos, alvarás e Habite-se na Prefeitura de Hortolândia.',
    icon: <Download size={24} />,
    details: [
      'Guia simplificado do Código de Obras Municipal de Hortolândia.',
      'Passo a passo para solicitação de Habite-se residencial e comercial.',
      'Instruções básicas de segurança em canteiros de obras.',
      'Manual de elaboração de plantas e vistorias sanitárias.',
    ],
  },
  {
    id: 'g4',
    title: 'Apoio a Estudantes e Escolas Locais',
    description:
      'Programas de mentoria de carreira e suporte para universitários e estudantes do ensino técnico das instituições de Hortolândia.',
    icon: <GraduationCap size={24} />,
    details: [
      'Parcerias com o IFSP Câmpus Hortolândia e Etec local.',
      'Mentorias periódicas com profissionais do conselho associado.',
      'Visitas técnicas monitoradas a empreendimentos civis e agrícolas.',
      'Valorização de trabalhos acadêmicos relevantes para a região.',
    ],
  },
]

type Tab = 'associado' | 'geral'

export default function Benefits() {
  const [activeTab, setActiveTab] = useState<Tab>('associado')

  const currentBenefits =
    activeTab === 'associado' ? MEMBER_BENEFITS : GENERAL_BENEFITS

  return (
    <section id="benefits" className={section.sectionAlt}>
      <div className={section.container}>
        <header className={section.header}>
          <span className={section.eyebrow}>Nossos Diferenciais</span>
          <h2 className={section.title}>
            Benefícios pensados para o profissional e para a sociedade
          </h2>
          <div className={section.rule} />
          <p className={section.lead}>
            Atuamos em duas frentes: serviços de alto impacto que apoiam a
            carreira dos nossos associados e suporte técnico, banco de
            profissionais e palestras abertas para toda a comunidade de
            Hortolândia.
          </p>
        </header>

        <div className={styles.tabsWrapper}>
          <div className={styles.tabs} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'associado'}
              onClick={() => setActiveTab('associado')}
              className={`${styles.tab} ${
                activeTab === 'associado' ? styles.tabActive : ''
              }`}
            >
              <Sparkles size={16} />
              <span>Para Associados</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'geral'}
              onClick={() => setActiveTab('geral')}
              className={`${styles.tab} ${
                activeTab === 'geral' ? styles.tabActive : ''
              }`}
            >
              <Building size={16} />
              <span>Para Não Associados</span>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {currentBenefits.map((benefit) => (
            <article key={benefit.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>{benefit.icon}</span>
                <h3 className={styles.cardTitle}>{benefit.title}</h3>
              </div>

              <p className={styles.cardText}>{benefit.description}</p>

              {/* <div className={styles.details}>
                <h4 className={styles.detailsTitle}>O que está incluído</h4>
                <ul>
                  {benefit.details.map((detail) => (
                    <li key={detail}>
                      <CheckCircle size={15} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </article>
          ))}
        </div>

        <div className={styles.callout}>
          {activeTab === 'associado' ? (
            <>
              <h3>Quer usufruir de todas as parcerias agora?</h3>
              <p>
                Profissionais formados e estudantes de graduação de Hortolândia
                podem realizar o pré-cadastro online de maneira rápida. Nossa
                equipe analisará seus dados de CREA e retornará.
              </p>
            </>
          ) : (
            <>
              <h3>Participe ativamente da nossa comunidade!</h3>
              <p>
                Fique por dentro das palestras técnicas gratuitas e baixe nossos
                guias de projetos. Se você é proprietário de uma empresa local e
                quer contratar engenharia ética e segura, confira nosso banco de
                profissionais ou fale conosco.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
