<template>
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="grid grid-cols-3 gap-4 content-normal ...">
      <div>
        <input
          class="searchBar max-w-sm py-2 px-4 outline-none rounded-lg text-gray-900"
          type="text"
          v-model="query"
          @keyup="getResult(query)"
        />
      </div>
      <div>02</div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";

const query = ref("");

const emits = defineEmits(["getResults"]);

function getResult(query) {
  if (query != "") {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API
        }&query=` + query
      )
      .then((response) => {
        emits("getResults", response.data.results);
      });
  }
}
</script>

<style scoped></style>
