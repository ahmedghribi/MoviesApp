<template>
  <div
    class="movies grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8"
  >
    <div
      class="movie p-5 w-full bg-[#2a2c3c] rounded-lg flex flex-col items-center justify-center gap-4 border-[#3d3d50] border-[3px] border-solid"
      v-for="result in paginatedResults"
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
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            @click="goToPage(false)"
            :class="{
              'block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                pageNumb !== 1,
              'block px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-300 border border-gray-300 rounded-l-lg cursor-not-allowed':
                pageNumb === 1,
            }"
          >
            <span class="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li v-for="page in visiblePages" :key="page">
          <a
            @click="changePage(page)"
            :class="{
              'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                page !== pageNumb,
              'px-3 py-2 leading-tight text-gray-800 bg-yellow-400 border border-yellow-400 hover:bg-yellow-400 hover:text-white dark:bg-yellow-600 dark:border-yellow-600 dark:text-white':
                page === pageNumb,
            }"
          >
            {{ page }}
          </a>
        </li>
        <li>
          <a
            @click="goToPage(true)"
            :class="{
              'block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
                pageNumb !== totalPages,
              'block px-3 py-2 leading-tight text-gray-500 bg-gray-300 border border-gray-300 rounded-r-lg cursor-not-allowed':
                pageNumb === totalPages,
            }"
          >
            <span class="sr-only">Next</span>
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <span> {{ pageNumb }}/{{ totalPages }} </span>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import axios from "axios";

const props = defineProps({
  setresults: {
    type: Array,
    required: true,
  },
  totalP: {
    type: Number,
    required: true,
  },
  pageNumb: {
    type: Number,
    required: true,
  },
});

const paginatedResults = ref<any[]>([]);
let itemsPerPage = 10;
const pageNumb = ref(props.pageNumb || 1);

// Calculate the total number of pages
const totalPages = computed(() => Math.ceil(props.totalP / itemsPerPage));

// Calculate the first page number to display
const firstVisiblePage = computed(() => {
  const currentPage = pageNumb.value;
  if (currentPage <= 5) {
    return 1;
  } else if (currentPage >= totalPages.value - 4) {
    return totalPages.value - 9;
  } else {
    return currentPage - 4;
  }
});

// Generate the array of visible pages
const visiblePages = computed(() => {
  const firstPage = firstVisiblePage.value;
  const lastPage = Math.min(firstPage + 9, totalPages.value);
  return Array.from(
    { length: lastPage - firstPage + 1 },
    (_, index) => firstPage + index
  );
});

const goToPage = (increment: boolean) => {
  let newPage = pageNumb.value;
  if (increment && pageNumb.value < totalPages.value) {
    newPage++;
  } else if (!increment && pageNumb.value > 1) {
    newPage--;
  }

  if (newPage !== pageNumb.value) {
    pageNumb.value = newPage;
    fetchData();
  }
};

const changePage = (page: number) => {
  if (page !== pageNumb.value) {
    pageNumb.value = page;
    fetchData();
  }
};

const fetchData = () => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_API
      }&language=en-US&page=${pageNumb.value}`
    )
    .then((response) => {
      paginatedResults.value = response.data.results;
    })
    .catch((error) => {
      console.error("Failed to fetch films:", error);
    });
};

fetchData();
</script>

<style scoped></style>
