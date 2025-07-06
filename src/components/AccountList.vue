<template>
  <v-container>
    <v-row align="center" justify="space-between" class="mb-4">
      <v-col cols="auto">
        <h2 class="text-h5">Управление учетными записями</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="accountStore.addAccount()">
          <v-icon start>mdi-plus</v-icon>
          Добавить
        </v-btn>
      </v-col>
    </v-row>

    <v-alert
      v-if="accountStore.accounts.length === 0"
      type="info"
      class="mb-4"
    >
      Нет учетных записей
    </v-alert>

    <div v-else>
      <AccountForm
        v-for="account in accountStore.accounts"
        :key="account.id"
        :account="account"
        @update:account="accountStore.updateAccount"
        @delete="accountStore.deleteAccount(account.id)"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore'
import AccountForm from './AccountForm.vue'

const accountStore = useAccountStore()
</script>
