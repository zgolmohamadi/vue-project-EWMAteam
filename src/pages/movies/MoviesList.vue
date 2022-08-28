<template>
  <movie-filter></movie-filter>

  <div
    v-if="loading"
    class="w-full flex mt-[119px] justify-center p-16"
  >
    <span class="loader"></span>
  </div>
  <div
    class="gap-x-16 mt-4 columns-1 md:mt-[119px] md:columns-2 xl:columns-3"
    v-else-if="!loading && hasMovies"
  >
    <movie-item
      v-for="movie in moviesList"
      :key="movie.id"
      :id="movie.id"
      :poster="movie.poster_path"
      :title="movie.title"
      :date="movie.release_date"
      :genreIds="movie.genre_ids"
    >
    </movie-item>
  </div>

  <div
    v-else-if="!loading && !hasMovies"
    class="mt-10 text-center font-bold h-48"
  >
    no Data Found
  </div>

  <movies-pagination
    v-if="!loading"
    @go-previous="changePage"
    @go-next="changePage"
    :pageNumber="pageNumber"
    :from="fromNumber"
    :to="toNumber"
    :totalPage="totalPage"
  />
</template>

<script>
import { store } from "../../store.js";
import MovieItem from "@/components/movies/MovieItem.vue";
import MoviesPagination from "@/components/movies/MoviesPagination.vue";
import MovieFilter from "@/components/movies/MovieFilter.vue";
export default {
  components: {
    MovieItem,
    MoviesPagination,
    MovieFilter,
  },
  props: ["pageNumberProp"],
  data() {
    return {
      nextIsDisable: false,
      itemsPerPage: 20,
    };
  },

  computed: {
    hasMovies() {
      return !this.loading && store?.moviesList?.length > 0;
    },
    moviesList() {
      return store.moviesList;
    },
    loading() {
      return store.loading;
    },
    pageNumber() {
      return store.pageNumber;
    },
    totalPage() {
      return store.totalPage;
    },
    fromNumber() {
      if (store.moviesList && store.moviesList.length > 0) {
        return (this.pageNumber - 1) * this.itemsPerPage + 1;
      } else {
        return null;
      }
    },
    toNumber() {
      if (store.moviesList && store.moviesList.length > 0) {
        return (
          (this.pageNumber - 1) * this.itemsPerPage +
          store.moviesList.length
        );
      } else {
        return null;
      }
    },
  },

  created() {
    this.getMovieList();
  },
  methods: {
    async getMovieList() {
      store.getMovieList(this.pageNumberProp);
      store.getGenres();
    },

    changePage(state) {
      let pageNumber;
      if (state === "next") {
        pageNumber = this.pageNumber + 1;
      } else {
        pageNumber = this.pageNumber > 1 ? this.pageNumber - 1 : 1;
      }
      store.getMovieList(pageNumber);
    },
  },
};
</script>

<style></style>
