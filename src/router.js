import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "./pages/movies/MoviesList.vue";
import MovieDetail from "./pages/movies/MovieDetail.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/moviesList" },
    { path: "/moviesList", component: MoviesList, name:"home", props: true },
    { path: "/movie/:id", component: MovieDetail, props: true },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
