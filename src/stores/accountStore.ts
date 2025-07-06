import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import type { Account } from '@/types/account'

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  // Добавление новой учетной записи
  const addAccount = () => {
    accounts.value.push({
      id: nanoid(),
      rawLabels: '',
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
      isValid: false
    })
  }

  // Удаление учетной записи
  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
  }

  // Обновление учетной записи
  const updateAccount = (updatedAccount: Account) => {
    const isValid = validateAccount(updatedAccount)
    const index = accounts.value.findIndex(a => a.id === updatedAccount.id)

    if (index === -1) return

    // Обновляем только если валидна
    if (isValid) {
      accounts.value[index] = {
        ...updatedAccount,
        rawLabels: updatedAccount.rawLabels,
        labels: updatedAccount.rawLabels
          .split(';')
          .filter(label => label.trim())
          .map(label => ({ text: label.trim() })),
        password: updatedAccount.type === 'LDAP' ? null : updatedAccount.password,
        isValid: true
      }
    } else {
      // Обновляем только флаг валидации — чтобы можно было показать ошибку
      accounts.value[index].isValid = false
    }
  }

  // Валидация учетной записи
  const validateAccount = (account: Account): boolean => {
    return !!account.login.trim() &&
      account.login.length <= 100 &&
      (account.type !== 'Локальная' ||
        (!!account.password && account.password.length <= 100)) &&
      account.rawLabels.length <= 50
  }

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccount,
    validateAccount
  }
}, {
  persist: {
    key: 'account-storage',
    storage: localStorage,
    paths: ['accounts'],
    serializer: {
      serialize: (value) => {
        // Сохраняем только валидные
        const validAccounts = value.accounts.filter((a: Account) => a.isValid)
        return JSON.stringify({ accounts: validAccounts })
      },
      deserialize: (value) => JSON.parse(value)
    }
  }
})
