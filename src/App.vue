<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Система управления учетными записями</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Базовый компонент не требует дополнительного кода
</script>

<style>
/* Глобальные стили можно оставить пустыми, так как Vuetify предоставляет все необходимое */
</style>
