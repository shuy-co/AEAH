import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  AlertCircle,
  Building,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
} from 'lucide-react'
import section from './section.module.css'
import styles from './Contact.module.css'

const INITIAL_DATA = {
  name: '',
  email: '',
  phone: '',
  subject: 'Dúvida Geral',
  message: '',
}

const INFO = [
  {
    Icon: MapPin,
    label: 'Endereço',
    lines: [
      'R. Zacarias Costa Camargo, 718 - Remanso Campineiro',
      'Hortolândia - SP, 13184-505',
    ],
  },
  {
    Icon: Clock,
    label: 'Horário de funcionamento',
    lines: ['Segunda a sexta-feira: 08:00h às 17:00h'],
  },
  {
    Icon: Phone,
    label: 'Telefone / WhatsApp',
    lines: ['(19) 3370-0977 — Secretaria'],
  },
  {
    Icon: Mail,
    label: 'E-mail oficial',
    lines: ['aeahorto@gmail.com'],
  },
]

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const subject = formData.get('subject')?.toString() ?? 'Contato'
    const message = formData.get('message')?.toString().trim() ?? ''

    const recipient = 'aehorto@gmail.com'
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(`Contato AEAH - ${subject}`)}&body=${encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`)}`

    window.location.href = mailtoLink
    event.currentTarget.reset()
    setSent(true)
  }

  return (
    <section id="contact" className={section.section}>
      <div className={section.container}>
        <header className={section.header}>
          <span className={section.eyebrow}>Fale Conosco</span>
          <h2 className={section.title}>
            Canais de Atendimento e Localização
          </h2>
          <div className={section.rule} />
          <p className={section.lead}>
            Dúvidas sobre convênios, anuidade de associado, agendamento de
            reuniões técnicas ou parcerias? Envie sua mensagem no formulário
            abaixo ou visite nossa sede em Hortolândia — SP.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.side}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <Building size={20} />
                Sede Oficial AEAH
              </h3>

              <ul className={styles.infoList}>
                {INFO.map(({ Icon, label, lines }) => (
                  <li key={label}>
                    <Icon size={18} />
                    <div>
                      <strong>{label}</strong>
                      {lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mapCard}>
              <h4 className={styles.mapTitle}>
                Esboço urbano da localização (Hortolândia — SP)
              </h4>

              <div className={styles.map}>
                <div className={styles.mapGrid} aria-hidden="true">
                  <span className={styles.road1} />
                  <span className={styles.road2} />
                  <span className={styles.road3} />
                  <span className={styles.road4} />
                </div>

                <div className={styles.mapTop}>
                  <span>Rodovia SP-101</span>
                  <span>Prefeitura</span>
                </div>

                <div className={styles.mapPin}>
                  <span className={styles.pin}>
                    <MapPin size={16} />
                  </span>
                  <span className={styles.pinLabel}>Sede AEAH Hortolândia</span>
                  <span className={styles.pinSub}>Jd. Remanso Campineiro</span>
                </div>

                <p className={styles.mapFoot}>
                  Próximo ao Parque Ecológico e Centro de Hortolândia
                </p>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            {isSuccess ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>
                  <Check size={28} />
                </span>

                <h3>Mensagem enviada!</h3>
                <p>
                  Recebemos seu contato. A secretaria da AEAH retornará em breve
                  pelo e-mail informado.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className={styles.again}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>
                  <MessageSquare size={20} />
                  Envie um e-mail direto
                </h3>

                <label className={styles.field}>
                  <span>Seu nome completo *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Pedro Henrique"
                  />
                </label>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span>Seu e-mail *</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Ex: pedro@email.com"
                    />
                  </label>

                  <label className={styles.field}>
                    <span>Telefone / WhatsApp</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Ex: (19) 99876-5432"
                    />
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Assunto principal</span>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="Dúvida Geral">
                      Dúvida geral / Informações
                    </option>
                    <option value="Convênios">
                      Convênios e planos de saúde
                    </option>
                    <option value="Eventos">
                      Eventos, cursos ou palestras
                    </option>
                    <option value="CREA-SP">
                      Fiscalização, ART e CREA-SP
                    </option>
                    <option value="Parcerias">
                      Propor parcerias com a AEAH
                    </option>
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Sua mensagem *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva sua dúvida, sugestão ou solicitação de contato..."
                  />
                </label>

                <p className={styles.hint}>
                  <AlertCircle size={12} />
                  Sua mensagem será enviada com segurança para a central
                  administrativa da AEAH.
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.submit}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw size={16} className={styles.spinning} />
                      <span>Enviando mensagem...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Enviar mensagem oficial</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
