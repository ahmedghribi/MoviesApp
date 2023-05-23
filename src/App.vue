<template>
  <Header />
  <SearchBar @get-results="updateResults" />

  <main class="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
    <MovieLists :setresults="filteredResults" :totalP="totalPages" :pageN="pageNumber" />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import SearchBar from "./components/SearchBar.vue";
import Header from "./components/header.vue";
import MovieLists from "./components/MovieLists.vue";

const results = ref<any[]>([]);
const filteredResults = ref<any[]>([]);
const totalPages = ref<any[]>([]);
const pageNumber = ref<any[]>([]);

const getAllFilms = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API
      }&language=en-US&page=1`
    )
    .then((response) => {
      totalPages.value = response.data.total_pages;
      pageNumber.value = response.data.page;
      results.value = response.data.results;
      filteredResults.value = results.value;
    })
    .catch((error) => {
      console.error("Failed to fetch films:", error);
    });
};

const updateResults = (content: any[]) => {
  if (content.length === 0) {
    filteredResults.value = results.value;
  } else {
    filteredResults.value = content;
  }
};

onMounted(() => {
  getAllFilms();
});
</script>

<style scoped></style>
