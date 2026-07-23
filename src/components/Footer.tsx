import { ArrowUp, Landmark } from 'lucide-react'
import styles from './Footer.module.css'
import confea from '../assets/logo_confea.png'
import mutua from '../assets/mutua.png'
import AEAH from '../assets/AEAH.png'
import crea from '../assets/crea.jpg'
import horto from '../assets/horto.png'

interface FooterProps {
  onNavigate: (sectionId: string) => void
}

const QUICK_LINKS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre Nós' },
  { id: 'benefits', label: 'Benefícios' },
  { id: 'events', label: 'Eventos' },
  { id: 'join', label: 'Seja Associado' },
  { id: 'contact', label: 'Contato' },
]

const PARTNERS = [
  { name: 'CREA-SP', url: 'https://www.creasp.org.br',  icon: crea },
  { name: 'CONFEA', url: 'https://www.confea.org.br', icon: confea },
  { name: 'Mútua-SP', url: 'https://www.mutua.com.br', icon: mutua },
  { name: 'Prefeitura de Hortolândia', url: 'https://www.hortolandia.sp.gov.br', icon: horto },
]

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={styles.brand}
            >
              
            <img src={AEAH} alt="Logo da AEAH" className={styles.partnerIcon}></img>
              <span className={styles.brandName}>AEAH Hortolândia</span>
            </button>

            <p className={styles.brandText}>
              Associação dos Engenheiros e Agrônomos de Hortolândia. Unindo
              saberes técnicos, defendendo a valorização profissional e
              promovendo o desenvolvimento sustentável regional.
            </p>

            <div className={styles.legal}>
              <p>
                Rua Antônio de Souza, 120 — Jd. Remanso Campineiro, Hortolândia —
                SP
              </p>
              <p>CNPJ: 69.214.774/0001-38 (demonstrativo)</p>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Acesso rápido</h4>
            <ul className={styles.quickLinks}>
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => onNavigate(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Órgãos &amp; parceiros</h4>
            <ul className={styles.partners}>
              {PARTNERS.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <img src={partner.icon} alt={`${partner.name} logo`} className={styles.partnerIcon}></img>
                    <span>{partner.name}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>
            <p>
              © {currentYear} AEAH — Associação dos Engenheiros e Agrônomos de
              Hortolândia.
            </p>
            <p>
              Desenvolvido com foco no suporte de profissionais e fomento
              tecnológico urbano.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.top}
            title="Voltar ao topo"
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
