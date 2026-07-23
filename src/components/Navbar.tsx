import { useEffect, useState } from 'react'
import { Landmark, Menu, UserPlus, X } from 'lucide-react'
import styles from './Navbar.module.css'
import logoaeah from "../assets/AEAH.png"

interface NavbarProps {
  activeSection: string
  onNavigate: (sectionId: string) => void
}

const NAV_ITEMS = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre Nós' },
  { id: 'benefits', label: 'Benefícios' },
  { id: 'events', label: 'Eventos' },
  { id: 'contact', label: 'Contato' },
]

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleItemClick = (id: string) => {
    onNavigate(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => handleItemClick('home')}
        >
          <img src={logoaeah} alt="Logo da AEAH"/>
          <span className={styles.brandText}>
            <span className={styles.brandName}>
              <span className={styles.brandCity}>Hortolândia</span>
            </span>
            <span className={styles.brandTagline}>
              Associação dos Engenheiros e Agrônomos
            </span>
          </span>
        </button>

        <div className={styles.desktop}>
          <ul className={styles.links}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`${styles.link} ${
                    activeSection === item.id ? styles.linkActive : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => handleItemClick('join')}
            className={styles.cta}
          >
            <UserPlus size={16} />
            <span>Seja Associado</span>
          </button>
        </div>

        <div className={styles.mobileActions}>
          <button
            type="button"
            onClick={() => handleItemClick('join')}
            className={styles.ctaCompact}
          >
            <UserPlus size={14} />
            <span className={styles.ctaCompactLabel}>Seja Associado</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={styles.toggle}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`${styles.mobileLink} ${
                activeSection === item.id ? styles.mobileLinkActive : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
