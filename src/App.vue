<template>
  <Header />

  <main class="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import Header from "./components/header.vue";
</script>

<style scoped></style>
