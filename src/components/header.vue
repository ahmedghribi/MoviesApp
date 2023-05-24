<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900" @click="goToHome()">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center">
        <img
          src="https://www.editions-tissot.fr/wp-content/uploads/2020/10/logo-hcse.png"
          class="h-8 mr-3"
          alt="HelloCSE Logo"
        />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

// Go to home
const goToHome = () => {
  router.push({ name: "MoviesList" });
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
