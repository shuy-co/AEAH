import { useEffect, useState, type FormEvent } from 'react'
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Tag,
  User,
  X,
} from 'lucide-react'
import type { AssociationEvent } from '../types'
import section from './section.module.css'
import styles from './Events.module.css'
import pagecurso from '../assets/PAGE_CURSO.png'

const STORAGE_KEY = 'aeah_registered_events'

const CATEGORIES = ['Todos', 'Curso', 'Palestra', 'Social', 'Workshop'] as const

const EVENTS: AssociationEvent[] = [
  {
    id: 'e1',
    title: 'Curso Presencial e Gratuito com Certificado: Drones na Engenharia: Tecnologia, Inovação e Aplicações',
    description:
      'Participe do Curso Presencial e Gratuito: Drones na Engenharia – Tecnologia, Inovação e Aplicações e descubra como essa tecnologia está transformando o mercado da construção civil...',
    date: '01 de Agosto, 2026',
    time: '08:00 - 12:00',
    location: 'Escritório da AEAH - R. Zacarias Costa Camargo, 718 - Remanso Campineiro, Hortolândia - SP',
    image: pagecurso,
    capacity: 120,
    registeredCount: 84,
    category: 'Workshop',
    price: 'Gratuito (Aberto ao Público)',
    speaker: 'EKesley Luís Moraes - Engenheiro Ambiental',
    registrationLink: 'https://hortolandia.portalsca.com.br/',
  },
]

type RegStatus = 'idle' | 'loading' | 'success'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [selectedEvent, setSelectedEvent] = useState<AssociationEvent | null>(null)
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regCrea, setRegCrea] = useState('')
  const [regStatus, setRegStatus] = useState<RegStatus>('idle')
  const [ticketCode, setTicketCode] = useState('')
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setRegisteredEvents(JSON.parse(saved))
      } catch {
        setRegisteredEvents([])
      }
    }
  }, [])

  useEffect(() => {
    const syncEventFromHash = () => {
      const hash = window.location.hash
      if (!hash) return

      const matchedEvent = EVENTS.find(
        (event) => `#event-${event.id}` === hash || event.registrationLink === hash,
      )

      if (matchedEvent) {
        setSelectedEvent(matchedEvent)
        setRegStatus('idle')
        setRegName('')
        setRegEmail('')
        setRegCrea('')
      }
    }

    syncEventFromHash()
    window.addEventListener('hashchange', syncEventFromHash)

    return () => window.removeEventListener('hashchange', syncEventFromHash)
  }, [])

  const filteredEvents =
    selectedCategory === 'Todos'
      ? EVENTS
      : EVENTS.filter((event) => event.category === selectedCategory)

  const handleOpenRegister = (event: AssociationEvent) => {
    const registrationLink = event.registrationLink?.trim()

    if (registrationLink) {
      const isExternalLink =
        registrationLink.startsWith('http://') || registrationLink.startsWith('https://')

      if (isExternalLink) {
        window.open(registrationLink, '_blank', 'noopener,noreferrer')
        return
      }

      window.history.pushState(null, '', registrationLink)
      setSelectedEvent(event)
      setRegStatus('idle')
      setRegName('')
      setRegEmail('')
      setRegCrea('')
      return
    }

    setSelectedEvent(event)
    setRegStatus('idle')
    setRegName('')
    setRegEmail('')
    setRegCrea('')
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)

    if (window.location.hash.startsWith('#event-')) {
      window.history.pushState(null, '', window.location.pathname + window.location.search)
    }
  }

  const handleRegisterSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!regName || !regEmail || !selectedEvent) return

    setRegStatus('loading')

    setTimeout(() => {
      const code = `AEAH-${selectedEvent.id.toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000,
      )}`
      setTicketCode(code)
      setRegStatus('success')

      const updated = [...registeredEvents, selectedEvent.id]
      setRegisteredEvents(updated)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }, 900)
  }

  return (
    <section id="events" className={section.section}>
      <div className={section.container}>
        <header className={section.header}>
          <span className={section.eyebrow}>Agenda Técnica e Social</span>
          <h2 className={section.title}>
            Nossos Próximos Eventos &amp; Capacitações
          </h2>
          <div className={section.rule} />
          <p className={section.lead}>
            Oferecemos eventos pensados para os nossos associados (cursos de
            reciclagem técnica) e também palestras e mesas-redondas abertas à
            comunidade e estudantes da região metropolitana de Campinas.
          </p>
        </header>

        <div className={styles.filters}>
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.filter} ${
                selectedCategory === category ? styles.filterActive : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredEvents.map((event) => {
            const isRegistered = registeredEvents.includes(event.id)
            const isExclusive = event.price.includes('Exclusivo')

            return (
              <article key={event.id} className={styles.card}>
                <div className={styles.media}>
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className={styles.badges}>
                    <span className={styles.badgeCategory}>
                      {event.category}
                    </span>
                    <span
                      className={
                        isExclusive ? styles.badgeExclusive : styles.badgeOpen
                      }
                    >
                      {isExclusive ? 'Associados' : 'Aberto ao Público'}
                    </span>
                  </div>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardText}>{event.description}</p>

                  <ul className={styles.meta}>
                    <li>
                      <Calendar size={15} />
                      <span>{event.date}</span>
                    </li>
                    <li>
                      <Clock size={15} />
                      <span>{event.time}</span>
                    </li>
                    <li>
                      <MapPin size={15} />
                      <span>{event.location}</span>
                    </li>
                    <li>
                      <User size={15} />
                      <span>
                        Palestrante: <strong>{event.speaker}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <footer className={styles.footer}>
                  <div className={styles.price}>
                    <span className={styles.priceLabel}>Inscrições / Valor</span>
                    <span className={styles.priceValue}>
                      <Tag size={12} />
                      {event.price}
                    </span>
                  </div>

                  {isRegistered ? (
                    <span className={styles.registered}>
                      <Check size={14} />
                      Inscrito!
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenRegister(event)}
                      className={styles.register}
                    >
                      <span>Inscrever-se</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </footer>
              </article>
            )
          })}
        </div>
      </div>

      {selectedEvent && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
        >
          <div
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <div>
                <span className={styles.modalEyebrow}>Inscrição de Evento</span>
                <h3 className={styles.modalTitle}>{selectedEvent.title}</h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className={styles.modalClose}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </header>

            <div className={styles.modalBody}>
              {regStatus === 'idle' && (
                <form onSubmit={handleRegisterSubmit} className={styles.form}>
                  {selectedEvent.price.includes('Exclusivo') && (
                    <div className={styles.notice}>
                      <AlertCircle size={20} />
                      <div>
                        <h4>Este evento é exclusivo para associados</h4>
                        <p>
                          Caso ainda não seja filiado à AEAH, envie sua ficha de
                          adesão pelo botão “Seja Associado” para ter acesso.
                        </p>
                      </div>
                    </div>
                  )}

                  <label className={styles.field}>
                    <span>Nome completo *</span>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(event) => setRegName(event.target.value)}
                      placeholder="Ex: Pedro Henrique Souza"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>E-mail *</span>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(event) => setRegEmail(event.target.value)}
                      placeholder="Ex: pedro@email.com"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Nº registro CREA-SP (opcional)</span>
                    <input
                      type="text"
                      value={regCrea}
                      onChange={(event) => setRegCrea(event.target.value)}
                      placeholder="Ex: 5070000000"
                    />
                  </label>

                  <button type="submit" className={styles.submit}>
                    Confirmar minha inscrição
                  </button>
                </form>
              )}

              {regStatus === 'loading' && (
                <div className={styles.loading}>
                  <span className={styles.spinner} />
                  <p>Processando inscrição institucional...</p>
                </div>
              )}

              {regStatus === 'success' && (
                <div className={styles.success}>
                  <span className={styles.successIcon}>
                    <Check size={28} />
                  </span>

                  <h4>Inscrição confirmada com sucesso!</h4>
                  <p>
                    Seu ingresso eletrônico foi gerado e enviado para{' '}
                    <strong>{regEmail}</strong>. Apresente o código abaixo na
                    recepção.
                  </p>

                  <div className={styles.ticket}>
                    <div className={styles.ticketHead}>
                      <span>AEAH HORTOLÂNDIA</span>
                      <span className={styles.ticketTag}>Voucher</span>
                    </div>

                    <dl className={styles.ticketData}>
                      <div>
                        <dt>Nome</dt>
                        <dd>{regName}</dd>
                      </div>
                      <div>
                        <dt>Evento</dt>
                        <dd>{selectedEvent.title}</dd>
                      </div>
                      <div>
                        <dt>Data</dt>
                        <dd>{selectedEvent.date.split(',')[0]}</dd>
                      </div>
                      <div>
                        <dt>Código do ticket</dt>
                        <dd className={styles.mono}>{ticketCode}</dd>
                      </div>
                    </dl>

                    <div className={styles.barcode}>
                      <div className={styles.bars} />
                      <span className={styles.mono}>{ticketCode}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={styles.close}
                  >
                    Fechar janela
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
