import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "@/components/MovieLists.vue";
import MovieDetails from "@/components/MovieDetail.vue";

const routes = [
  {
    path: "/",
    name: "MoviesList",
    component: MoviesList,
  },
  {
    path: "/movie/:id",
    name: "MovieDetails",
    component: MovieDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
