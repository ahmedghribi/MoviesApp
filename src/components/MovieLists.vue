<template>
  <div
    class="movies grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8"
  >
    <div
      class="movie p-5 w-full bg-[#2a2c3c] rounded-lg flex flex-col items-center justify-center gap-4 border-[#3d3d50] border-[3px] border-solid"
      v-for="result in setresults"
      :key="result.id"
    >
      <div class="movie-img w-full relative overflow-hidden group">
        <img
          class="w-full"
          :src="'http://image.tmdb.org/t/p/w500/' + result.poster_path"
        />
        <div
          class="movie-info absolute z-10 -bottom-full left-0 w-full h-full transition-all duration-300 ease-in-out group-hover:bottom-0 bg-[linear-gradient(0deg,rgb(0,0,0)_0%,rgba(0,0,0,0)_100%)]"
        >
          <div
            class="movie-info-details absolute bottom-3 left-3 z-20 flex flex-col gap-3 w-3/4"
          >
            <div class="movie-title text-lg text-[#efc700]">
              {{ result.original_title }}
            </div>

            <div class="movie-info-date">{{ result.release_date }}</div>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px">
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  setresults: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
