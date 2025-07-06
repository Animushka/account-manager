export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  rawLabels: string // строка из input
  labels: { text: string }[] // массив после split
  type: AccountType
  login: string
  password: string | null
  isValid?: boolean
}
