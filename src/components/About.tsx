import {
  Award,
  Eye,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Target,
} from 'lucide-react'
import section from './section.module.css'
import styles from './About.module.css'

const VALUES = [
  {
    title: 'Missão',
    description:
      'Valorizar os profissionais de engenharia e agronomia de Hortolândia, proporcionando capacitação, benefícios e fomento tecnológico sustentável.',
    Icon: Target,
  },
  {
    title: 'Visão',
    description:
      'Ser referência associativa no Estado de São Paulo pela excelência no suporte profissional, integração com a comunidade e parcerias estratégicas inovadoras.',
    Icon: Eye,
  },
  {
    title: 'Valores',
    description:
      'Ética profissional, sustentabilidade ambiental, transparência nas ações, desenvolvimento científico, compromisso social e união de classe.',
    Icon: ShieldCheck,
  },
]

const HIGHLIGHTS = [
  { label: 'Parcerias com a Prefeitura', Icon: Landmark },
  { label: 'Atualização Técnica Permanente', Icon: GraduationCap },
  { label: 'Selos de Qualidade Técnica', Icon: Award },
  { label: 'Suporte Ético do CREA-SP', Icon: ShieldCheck },
]

const BOARD = [
  {
    name: 'Eng. Roberto Silva',
    role: 'Presidente',
    profession: 'Engenheiro Civil',
    desc: 'Especialista em Estruturas e Planejamento Urbano',
  },
  {
    name: 'Dr. Carlos Mendes',
    role: 'Vice-Presidente',
    profession: 'Engenheiro Agrônomo',
    desc: 'Pesquisador em Agricultura Sustentável',
  },
  {
    name: 'Dra. Aline Santos',
    role: 'Diretora de Agronomia',
    profession: 'Engenheira Agrônoma',
    desc: 'Mestre em Manejo de Solo e Fitotecnia',
  },
  {
    name: 'Eng. Marcus Vinícius',
    role: 'Diretor Técnico',
    profession: 'Engenheiro Eletricista',
    desc: 'Especialista em Automação Industrial e Redes',
  },
  {
    name: 'Engª. Letícia Rezende',
    role: 'Diretora Financeira',
    profession: 'Engenheira de Produção',
    desc: 'Gestora de Projetos de Infraestrutura',
  },
]

function getInitials(name: string) {
  return (
    name
      .split(' ')
      .slice(1)
      .map((part) => part[0])
      .join('')
      .slice(0, 2) || 'AE'
  )
}

export default function About() {
  return (
    <section id="about" className={section.section}>
      <div className={section.container}>
        <header className={section.header}>
          <span className={section.eyebrow}>Quem Somos</span>
          <h2 className={section.title}>
            Mais de três décadas impulsionando a Engenharia e Agronomia regional
          </h2>
          <div className={section.rule} />
          <p className={section.lead}>
            Fundada em 1993, a AEAH desempenha um papel fundamental no avanço
            tecnológico, industrial e na governança urbana de Hortolândia — SP,
            uma das cidades de maior crescimento econômico do país.
          </p>
        </header>

        <div className={styles.split}>
          <div className={styles.narrative}>
            <h3 className={styles.narrativeTitle}>
              Nossa história de compromisso com Hortolândia
            </h3>

            <p>
              A Associação dos Engenheiros e Agrônomos de Hortolândia (AEAH)
              nasceu da necessidade de unir profissionais e prover um espaço de
              cooperação mútua. Atuamos ativamente em debates sobre o Plano
              Diretor do município, apoiamos a fiscalização do CREA-SP de forma
              ética e orientativa, e conectamos o conhecimento acadêmico às
              demandas do mercado local.
            </p>

            <p>
              Trabalhamos lado a lado com a Prefeitura e a sociedade civil para
              garantir que os projetos residenciais, comerciais, industriais e
              agrícolas do município sejam executados com a máxima excelência
              técnica e responsabilidade socioambiental.
            </p>

            <ul className={styles.highlights}>
              {HIGHLIGHTS.map(({ label, Icon }) => (
                <li key={label}>
                  <Icon size={18} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.valuesCard}>
            <h4 className={styles.valuesTitle}>O que move a AEAH</h4>

            <div className={styles.valuesList}>
              {VALUES.map(({ title, description, Icon }) => (
                <div key={title} className={styles.value}>
                  <span className={styles.valueIcon}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <h5 className={styles.valueName}>{title}</h5>
                    <p className={styles.valueText}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <div className={styles.board}>
          <div className={styles.boardHeader}>
            <h3 className={styles.boardTitle}>Nossa Diretoria Executiva</h3>
            <p className={styles.boardSubtitle}>
              Profissionais dedicados voluntariamente à gestão da AEAH e à
              valorização da classe
            </p>
          </div>

          <div className={styles.boardGrid}>
            {BOARD.map((member) => (
              <article key={member.name} className={styles.member}>
                <span className={styles.avatar}>{getInitials(member.name)}</span>
                <h4 className={styles.memberName}>{member.name}</h4>
                <span className={styles.memberRole}>{member.role}</span>
                <span className={styles.memberProfession}>
                  {member.profession}
                </span>
                <p className={styles.memberDesc}>{member.desc}</p>
              </article>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
