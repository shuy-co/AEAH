import { ArrowRight, Award, CalendarDays, GraduationCap, Users } from 'lucide-react'
import styles from './Hero.module.css'

interface HeroProps {
  onNavigate: (sectionId: string) => void
}

const STATS = [
  { value: '+350', label: 'Profissionais & Estudantes', Icon: Users },
  { value: '25+', label: 'Convênios & Descontos', Icon: GraduationCap },
  { value: '15+', label: 'Cursos & Palestras por ano', Icon: CalendarDays },
  { value: 'Desde 1993', label: 'Unindo Hortolândia', Icon: Award },
]

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.glowBlue} aria-hidden="true" />
      <div className={styles.glowRed} aria-hidden="true" />

      <div className={styles.container}>
        <span className={styles.tagline}>
          <span className={styles.dot} aria-hidden="true" />
          AEAH — Engenharia, Agronomia e Geologia
        </span>

        <h1 className={styles.title}>
          Valorizando a <strong>Engenharia</strong> &amp;{' '}
          <strong>Agronomia</strong> de Hortolândia
        </h1>

        <p className={styles.lead}>
          Unindo profissionais, oferecendo benefícios exclusivos de saúde, lazer
          e educação, capacitação contínua de alta qualidade e networking
          estratégico para impulsionar sua carreira e construir uma cidade
          inovadora.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => onNavigate('join')}
            className={styles.primary}
          >
            <span>Quero me associar agora</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('benefits')}
            className={styles.secondary}
          >
            Conhecer Benefícios
          </button>
        </div>

        <dl className={styles.stats}>
          {STATS.map(({ value, label, Icon }) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statIcon}>
                <Icon size={18} />
              </span>
              <div>
                <dt className={styles.statValue}>{value}</dt>
                <dd className={styles.statLabel}>{label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
