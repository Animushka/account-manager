<template>
  <v-card flat class="mb-2 pa-2">
    <v-form @submit.prevent class="d-flex align-center flex-wrap gap-4">
      <!-- Метки -->
      <v-text-field
        v-model="localAccount.rawLabels"
        label="Метки"
        placeholder="через ;"
        maxlength="50"
        :counter="50"
        density="compact"
        variant="outlined"
        color="primary"
        hint="Необязательное поле"
        persistent-hint
        @blur="handleBlur"
        style="width: 200px"
      />

      <!-- Тип записи -->
      <v-select
        v-model="localAccount.type"
        :items="accountTypes"
        item-title="title"
        item-value="value"
        label="Тип"
        density="compact"
        variant="outlined"
        color="primary"
        @update:modelValue="handleTypeChange"
        style="width: 140px"
      />

      <!-- Логин -->
      <v-text-field
        v-model="localAccount.login"
        label="Логин"
        maxlength="100"
        density="compact"
        variant="outlined"
        color="primary"
        :rules="[requiredRule]"
        @blur="handleBlur"
        style="width: 180px"
      />

      <!-- Пароль -->
      <v-text-field
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        :type="showPassword ? 'text' : 'password'"
        label="Пароль"
        maxlength="100"
        density="compact"
        variant="outlined"
        color="primary"
        :rules="[requiredRule]"
        @blur="handleBlur"
        style="width: 180px"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
      />

      <!-- Удалить -->
      <div class="d-flex align-center mx-2 mb-6">
        <v-btn icon color="error" @click="emit('delete')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Account, AccountType } from '@/types/account'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'update:account', value: Account): void
  (e: 'delete'): void
}>()

const showPassword = ref(false)

const accountTypes = [
  { title: 'LDAP', value: 'LDAP' },
  { title: 'Локальная', value: 'Локальная' }
]

const requiredRule = (value: string) => !!value || 'Обязательное поле'

const localAccount = computed({
  get: () => props.account,
  set: (value) => emit('update:account', value)
})

const handleBlur = () => {
  const labels = localAccount.value.rawLabels
    .split(';')
    .map(l => l.trim())
    .filter(Boolean)
    .map(text => ({ text }))

  emit('update:account', {
    ...localAccount.value,
    labels
  })
}

const handleTypeChange = (type: AccountType) => {
  emit('update:account', {
    ...localAccount.value,
    type,
    password: type === 'LDAP' ? null : ''
  })
}
</script>
