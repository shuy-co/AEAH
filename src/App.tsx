import { useEffect, useState } from 'react'
import About from './components/About'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import Events from './components/Events'
import Footer from './components/Footer'
import Hero from './components/Hero'
import JoinForm from './components/JoinForm'
import Navbar from './components/Navbar'
import styles from './App.module.css'

const SECTIONS = ['home', 'about', 'benefits', 'events', 'join', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId)
        if (!el) continue

        if (
          scrollPosition >= el.offsetTop &&
          scrollPosition < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.app}>
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Benefits />
        <Events />
        <JoinForm />
        <Contact />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
