import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  CheckSquare,
  Download,
  FileText,
  Landmark,
  Mail,
  Phone,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  User,
} from 'lucide-react'
import type { MemberFormData } from '../types'
import section from './section.module.css'
import styles from './JoinForm.module.css'
import AEAH from '../assets/AEAH.png'

const INITIAL_DATA: MemberFormData = {
  name: '',
  email: '',
  phone: '',
  document: '',
  creaNumber: '',
  profession: 'Engenharia Civil',
  category: 'Profissional',
  company: '',
  city: 'Hortolândia',
  interests: [],
}

const PROFESSIONS = [
  'Engenharia Civil',
  'Engenharia Agronômica / Agronomia',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Engenharia Ambiental / Sanitária',
  'Engenharia de Produção',
  'Arquitetura e Urbanismo',
  'Outra Engenharia / Tecnologia',
]

const INTERESTS = [
  'Cursos de Capacitação Técnica',
  'Eventos Sociais e Networking',
  'Convênios de Saúde e Odonto',
  'Aprovação de Projetos Municipais',
  'Palestras sobre Novas Tecnologias',
  'Grupo de Estudos / Comitês Técnicos',
]

export default function JoinForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<MemberFormData>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [memberId, setMemberId] = useState<string | null>(null)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      const { name, email, phone, document } = formData
      if (!name || !email || !phone || !document) {
        window.alert('Preencha todos os campos obrigatórios para prosseguir.')
        return
      }
    }

    if (step === 2 && formData.category === 'Profissional' && !formData.creaNumber) {
      window.alert('Informe seu registro no CREA-SP ou selecione a categoria Estudante.')
      return
    }

    setStep((prev) => prev + 1)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setMemberId(`AEAH-${Math.floor(100000 + Math.random() * 900000)}`)
      setIsSuccess(true)
      setIsLoading(false)
    }, 900)
  }

  const handleReset = () => {
    setFormData(INITIAL_DATA)
    setStep(1)
    setIsSuccess(false)
    setMemberId(null)
  }

  const handleDownloadCard = () => {
    const payload = { ...formData, memberId, issuedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${memberId ?? 'aeah-carteira'}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const registryValue =
    formData.category === 'Profissional'
      ? formData.creaNumber || 'CREA-SP PENDENTE'
      : formData.company || 'ESTUDANTE ATIVO'

  return (
    <section id="join" className={section.sectionAlt}>
      <div className={section.container}>
        <header className={section.header}>
          <span className={section.eyebrow}>Filie-se à AEAH</span>
          <h2 className={section.title}>Ficha de Pré-Cadastro de Adesão</h2>
          <div className={section.rule} />
          <p className={section.lead}>
            Seja você engenheiro atuante, agrônomo experiente, recém-formado ou
            estudante universitário em Hortolândia: junte-se a nós para usufruir
            de convênios de saúde, descontos acadêmicos e ampliar sua rede.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.formCard}>
            {!isSuccess ? (
              <>
                <div className={styles.progress}>
                  <span className={styles.progressLabel}>
                    Etapa {step} de 3
                  </span>
                  <div className={styles.progressBars}>
                    {[1, 2, 3].map((value) => (
                      <span
                        key={value}
                        className={`${styles.bar} ${value === step
                            ? styles.barCurrent
                            : value < step
                              ? styles.barDone
                              : ''
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  {step === 1 && (
                    <div className={styles.step}>
                      <h3 className={styles.stepTitle}>
                        Passo 1: Seus dados pessoais
                      </h3>

                      <label className={styles.field}>
                        <span>Nome completo *</span>
                        <div className={styles.inputWrap}>
                          <User size={16} />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ex: Amanda Rezende de Souza"
                          />
                        </div>
                      </label>

                      <div className={styles.row}>
                        <label className={styles.field}>
                          <span>E-mail de contato *</span>
                          <div className={styles.inputWrap}>
                            <Mail size={16} />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Ex: amanda@email.com"
                            />
                          </div>
                        </label>

                        <label className={styles.field}>
                          <span>Celular / WhatsApp *</span>
                          <div className={styles.inputWrap}>
                            <Phone size={16} />
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Ex: (19) 99876-5432"
                            />
                          </div>
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.field}>
                          <span>CPF ou CNPJ *</span>
                          <div className={styles.inputWrap}>
                            <FileText size={16} />
                            <input
                              type="text"
                              name="document"
                              required
                              value={formData.document}
                              onChange={handleInputChange}
                              placeholder="Ex: 123.456.789-00"
                            />
                          </div>
                        </label>

                        <label className={styles.field}>
                          <span>Cidade de atuação</span>
                          <div className={styles.inputWrap}>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="Ex: Hortolândia - SP"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className={styles.step}>
                      <h3 className={styles.stepTitle}>
                        Passo 2: Informações de registro
                      </h3>

                      <label className={styles.field}>
                        <span>Categoria de filiação</span>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="Profissional">
                            Profissional registrado (Engenheiro / Agrônomo)
                          </option>
                          <option value="Estudante">
                            Estudante de nível superior
                          </option>
                          <option value="Empresa">
                            Pessoa jurídica / Empresa técnica
                          </option>
                        </select>
                      </label>

                      <label className={styles.field}>
                        <span>Área profissional / curso</span>
                        <select
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                        >
                          {PROFESSIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>

                      {formData.category === 'Profissional' ? (
                        <label className={styles.field}>
                          <span>Registro profissional CREA-SP *</span>
                          <div className={styles.inputWrap}>
                            <Award size={16} />
                            <input
                              type="text"
                              name="creaNumber"
                              value={formData.creaNumber}
                              onChange={handleInputChange}
                              placeholder="Ex: 5070000000"
                            />
                          </div>
                          <small>
                            Sua filiação depende da validação junto ao conselho
                            regional.
                          </small>
                        </label>
                      ) : (
                        <label className={styles.field}>
                          <span>Faculdade / escola técnica</span>
                          <div className={styles.inputWrap}>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Ex: IFSP Hortolândia, Mackenzie, UNIP"
                            />
                          </div>
                        </label>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className={styles.step}>
                      <h3 className={styles.stepTitle}>
                        Passo 3: Seus interesses na associação
                      </h3>

                      <p className={styles.stepHint}>
                        Selecione quais temas e benefícios da AEAH mais te
                        interessam:
                      </p>

                      <div className={styles.interests}>
                        {INTERESTS.map((option) => {
                          const isChecked = formData.interests.includes(option)
                          return (
                            <button
                              type="button"
                              key={option}
                              onClick={() => handleInterestToggle(option)}
                              className={`${styles.interest} ${isChecked ? styles.interestActive : ''
                                }`}
                            >
                              <span>{option}</span>
                              <span className={styles.checkbox}>
                                {isChecked && <Check size={12} />}
                              </span>
                            </button>
                          )
                        })}
                      </div>

                      <div className={styles.terms}>
                        <CheckSquare size={18} />
                        <p>
                          Ao enviar, concordo em disponibilizar meus dados para
                          fins de análise cadastral e contato da secretaria da
                          AEAH, conforme os termos éticos e estatutários
                          vigentes.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={styles.actions}>
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => prev - 1)}
                        className={styles.back}
                      >
                        <ArrowLeft size={16} />
                        <span>Voltar</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className={styles.next}
                      >
                        <span>Avançar</span>
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.next}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw size={16} className={styles.spinning} />
                            <span>Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Check size={16} />
                            <span>Enviar meu cadastro</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.success}>
                <span className={styles.successIcon}>
                  <Check size={28} />
                </span>

                <h3>Pré-cadastro recebido!</h3>
                <p>
                  Seus dados de adesão foram enviados à nossa diretoria. Você
                  receberá um e-mail com instruções para o pagamento da taxa
                  anual ou agendamento da visita.
                </p>

                <div className={styles.nextSteps}>
                  <h4>
                    <Sparkles size={14} />
                    O que fazer agora?
                  </h4>
                  <ul>
                    <li>Baixe seu cartão provisório para identificação.</li>
                    <li>
                      A carteirinha provisória permite participar dos cursos
                      abertos.
                    </li>
                    <li>Envie dúvidas adicionais pelo formulário de contato.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.reset}
                >
                  Fazer outro cadastro
                </button>
              </div>
            )}
          </div>

          <aside className={styles.aside}>
            <div className={styles.cardPanel}>
              <h3 className={styles.cardPanelTitle}>
                <Landmark size={14} />
                Carteira Associativa Provisória
              </h3>

              <p className={styles.cardPanelHint}>
                {isSuccess
                  ? 'Carteirinha oficial provisória gerada'
                  : 'Preencha o formulário para visualizar seu cartão'}
              </p>

              <div
                className={`${styles.idCard} ${isSuccess ? styles.idCardActive : ''
                  }`}
              >
                <div className={styles.idPattern} aria-hidden="true" />
                <div className={styles.idGlow} aria-hidden="true" />

                <div className={styles.idContent}>
                  <div className={styles.idHeader}>
                    <div className={styles.idBrand}>
                      <span>
                        <img src={AEAH} alt="Logo da AEAH" className={styles.logo}></img>
                      </span>
                    </div>
                    <span className={styles.idCategory}>
                      {formData.category}
                    </span>
                  </div>

                  <div className={styles.idBody}>
                    <span className={styles.idLabel}>Profissional filiado</span>
                    <h4 className={styles.idName}>
                      {formData.name || 'NOME DO PROFISSIONAL'}
                    </h4>

                    <div className={styles.idGrid}>
                      <div>
                        <span className={styles.idLabel}>Título / curso</span>
                        <span className={styles.idValue}>
                          {formData.profession}
                        </span>
                      </div>
                      <div>
                        <span className={styles.idLabel}>
                          Registro / matrícula
                        </span>
                        <span className={`${styles.idValue} ${styles.idMono}`}>
                          {registryValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.idFooter}>
                    <div>
                      <span className={styles.idLabel}>Código do associado</span>
                      <span className={styles.idCode}>
                        {memberId ?? 'AEAH-XXXXXX'}
                      </span>
                    </div>
                    <div className={styles.idStatusWrap}>
                      <span className={styles.idLabel}>Status cadastral</span>
                      <span
                        className={`${styles.idStatus} ${isSuccess ? styles.idStatusActive : ''
                          }`}
                      >
                        {isSuccess ? 'Adesão ativa (provisória)' : 'Aguardando ficha'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isSuccess && memberId && (
                <div className={styles.cardActions}>
                  <div className={styles.warning}>
                    <ShieldAlert size={16} />
                    <p>
                      Sua carteirinha provisória permite identificação técnica em
                      palestras locais e descontos preliminares em cursos
                      parceiros até a validação definitiva.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadCard}
                    className={styles.download}
                  >
                    <Download size={14} />
                    <span>Baixar carteira digital (JSON)</span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
