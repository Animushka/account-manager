export const ACCOUNT_TYPES = [
  { title: 'LDAP', value: 'LDAP' },
  { title: 'Локальная', value: 'Локальная' }
] as const

export type AccountType = typeof ACCOUNT_TYPES[number]['value']

