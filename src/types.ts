import type { ReactNode } from 'react'

export interface BenefitItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  details: string[]
}

export interface AssociationEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  capacity: number
  registeredCount: number
  category: 'Curso' | 'Palestra' | 'Social' | 'Workshop'
  price: string
  speaker: string
  speakerBio?: string
  registrationLink?: string
}

export interface MemberFormData {
  name: string
  email: string
  phone: string
  document: string
  creaNumber: string
  profession: string
  category: 'Profissional' | 'Estudante' | 'Empresa'
  company?: string
  city: string
  interests: string[]
}
