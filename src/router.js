import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "./pages/movies/MoviesList.vue";
import movieDetail from "./pages/movies/MovieDetail.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory('/vue-project-EWMAteam/'),
  routes: [
    { path: "/", component: MoviesList, name:"home", props: true },
    { path: "/moviesList", redirect:'/' },
    { path: "/movie/:id", component: movieDetail, props: true },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
