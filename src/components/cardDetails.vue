<template>
  <div class="flex flex-col items-center justify-center mt-8">
    <div class="max-w-full w-full shadow-lg rounded-lg overflow-hidden">
      <div class="flex">
        <div class="w-1/3">
          <img
            :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path"
            alt="Movie Poster"
            class="object-cover w-full h-auto"
          />
        </div>
        <div class="w-2/3 p-6">
          <h2 class="text-2xl font-bold text-blue-200 mb-4">
            {{ movie.title }}
          </h2>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Description:</span>
            <br />
            {{ movie.overview }}
          </p>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Date de sortie:</span>
            {{ movie.release_date }}
          </p>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Genre:</span>
            <span v-for="genre in movie.genres" :key="genre.id" class="mr-2">
              {{ genre.name }}
            </span>
          </p>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Nombre de votes:</span>
            {{ movie.vote_count }}
          </p>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Note sur 10:</span>
            {{ movie.vote_average }}/10
          </p>
          <p class="text-white-700 mt-2">
            <span class="font-bold">Budget du film:</span>
            {{ movie.budget }} $
          </p>
        </div>
      </div>
      <div class="flex flex-wrap justify-center mt-8">
        <div v-for="item in relatedFilms.slice(0, 4)" :key="item.id" class="w-1/4 p-4">
          <div class="shadow-lg rounded-lg p-4">
            <img
              :src="'http://image.tmdb.org/t/p/w500/' + item.poster_path"
              alt="Related Movie Poster"
              class="object-cover w-full h-48"
            />
            <h3 class="text-lg font-bold mt-4">{{ item.title }}</h3>
            <p class="text-gray-500 mt-2">{{ item.release_date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
const router = useRoute();

const relatedFilms = ref([]);
const id = ref();

// Get similar movies
const fetchData = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id.value}/similar?api_key=${
        import.meta.env.VITE_API
      }&language=fr-FR`
    )
    .then((response) => {
      relatedFilms.value = response.data.results;
    })
    .catch((error) => {
      console.error("Failed to fetch Related films:", error);
    });
};

onMounted(() => {
  id.value = router.params.id;
  fetchData();
});
</script>

<style scoped>
/* Ajoutez ici les styles personnalisés si nécessaire */
</style>
