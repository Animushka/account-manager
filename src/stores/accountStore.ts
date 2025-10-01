import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import type { Account } from '@/types/account'
import { validateAccount } from '@/composables/useAccountValidation'
import { ACCOUNT_TYPES } from '@/constants/accountTypes'

export const useAccountStore = defineStore(
  'accounts',
  () => {
  const accounts = ref<Account[]>([])

  // Добавление новой учетной записи
  const addAccount = () => {
    accounts.value.push({
      id: nanoid(),
      rawLabels: '',
      labels: [],
      type: ACCOUNT_TYPES[1].value,
      login: '',
      password: ''
    })
  }

  // Удаление учетной записи
  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
  }

  // Обновление учетной записи
  const updateAccount = (updatedAccount: Account) => {
    const index = accounts.value.findIndex(a => a.id === updatedAccount.id)

    if (index === -1) return

    accounts.value[index] = {
      ...updatedAccount,
      rawLabels: updatedAccount.rawLabels,
      labels: updatedAccount.rawLabels
        .split(';')
        .filter(label => label.trim())
        .map(label => ({ text: label.trim() })),
      password: updatedAccount.type === 'LDAP' ? null : updatedAccount.password
    }
  }

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccount
  }
  },
  {
    // @ts-ignore
    persist: {
      key: 'account-storage',
      storage: localStorage,
      serializer: {
        serialize: (value: { accounts: Account[] }) => {
          // Сохраняем только валидные записи
          const validAccounts = value.accounts.filter((account) => validateAccount(account))
          return JSON.stringify({ accounts: validAccounts })
        },
        deserialize: (value: string) => JSON.parse(value)
      }
    }
  }
)
