import { createRouter, createWebHistory } from "vue-router";
import MoviesList from "./pages/movies/MoviesList.vue";
import MovieDetail from "./pages/movies/MovieDetail.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory('/vue-project-EWMAteam/'),
  routes: [
    { path: "/", redirect: "/moviesList" },
    { path: "/moviesList", component: MoviesList, name:"home", props: true },
    { path: "/movie/:id", component: () => import('./pages/movies/MovieDetail.vue'), props: true },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
