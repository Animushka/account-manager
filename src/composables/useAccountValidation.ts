import { computed, type Ref } from 'vue'
import type { Account } from '@/types/account'

// Чистая функция валидации (без реактивности)
export function validateAccount(account: Account): boolean {
  return (
    !!account.login.trim() &&
    account.login.length <= 100 &&
    (account.type !== 'Локальная' || (!!account.password && account.password.length <= 100)) &&
    account.rawLabels.length <= 50
  )
}

// Composable для использования в компонентах
export function useAccountValidation(account: Ref<Account>) {
  // Правила валидации для полей
  const loginRule = (value: string) => {
    if (!value || !value.trim()) return 'Обязательное поле'
    if (value.length > 100) return 'Максимум 100 символов'
    return true
  }

  const passwordRule = (value: string | null) => {
    if (account.value.type === 'Локальная') {
      if (!value || !value.trim()) return 'Обязательное поле'
      if (value.length > 100) return 'Максимум 100 символов'
    }
    return true
  }

  // Проверка валидности полей
  const isLoginValid = computed(() => {
    return !!account.value.login && account.value.login.trim().length > 0
  })

  const isPasswordValid = computed(() => {
    if (account.value.type === 'LDAP') return true
    return !!account.value.password && account.value.password.trim().length > 0
  })

  return {
    loginRule,
    passwordRule,
    isLoginValid,
    isPasswordValid
  }
}


