import type { User } from './user'

export interface Mentor extends Omit<User, 'professional'> {
  description?: string
  contenttype: string
  specialty?: string
  experience?: string
  hospital?: string
  achievements?: string[]
  companyLogo?: string
  company?: {
    name: string
    logo: string
  }
}
