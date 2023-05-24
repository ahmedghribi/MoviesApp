<template>
  <div>
    <CardDetails :movie="movie"></CardDetails>
  </div>
</template>

<script setup lang="ts">
import CardDetails from "./cardDetails.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const movie_id = route.params.id;
const movie = ref<any[]>([]);

// Get the movie details
const fetchData = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${import.meta.env.VITE_API}`
    )
    .then((response) => {
      movie.value = response.data;
    })
    .catch((error) => {
      console.error("Failed to fetch films:", error);
    });
};

onMounted(() => {
  fetchData();
});
</script>
