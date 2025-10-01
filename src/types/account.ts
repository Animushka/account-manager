import type { AccountType } from '@/constants/accountTypes'

export interface Account {
  id: string
  rawLabels: string
  labels: { text: string }[]
  type: AccountType
  login: string
  password: string | null
}
