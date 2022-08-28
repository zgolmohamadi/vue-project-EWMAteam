<template>
  <div
    v-if="loading"
    class="w-full flex mt-[119px] justify-center p-16"
  >
    <span class="loader"></span>
  </div>
  <div v-else-if="movieDetails && !this.loading">
    <div class="top-box sm:px-9 px-4">
      <button @click.prevent="goToHome" class="btn px-5">
        ← Back
      </button>
      <a
        :href="movieDetails.homepage"
        class="pl-4 md:pl-16 flex flex-col"
      >
        <span class="text-lg font-bold">{{
          movieDetails.title
        }}</span>
        <span class="text-lg">{{ movieDetails.tagline }}</span>
      </a>
    </div>
    <div class="mt-4 md:mt-20 flex flex-col sm:flex-row">
      <div class="image-holder overflow-hidden max-w-full center">
        <img
          :src="posterPath"
          alt="poster-img"
          title="poster-image"
          class="md:max-w-330 rounded-xl max-w-full mx-auto"
        />
      </div>
      <ul class="mt-3 md:mt-0 sm:ml-16 grow">
        <li>
          <span>Budget</span>
          <span>${{ formattedPrice(movieDetails.budget) }}</span>
        </li>
        <li>
          <span>Revenue</span>
          <span>${{ formattedPrice(movieDetails.revenue) }}</span>
        </li>
        <li>
          <span>Release Date</span>
          <span>{{ movieDetails.release_date }}</span>
        </li>
        <li>
          <span>Runtime</span>
          <span>{{ toHoursAndMinutes(movieDetails.runtime) }}</span>
        </li>
        <li>
          <span>Score</span>
          <span
            >{{ movieDetails.vote_average }} ({{
              movieDetails.vote_count
            }})</span
          >
        </li>
        <li>
          <span>Genres</span>
          <span>
            <template
              v-for="(genre, index) in movieDetails.genres"
              :key="id + genre"
            >
              {{ genre.name }}
              <template v-if="index < movieDetails.genres.length - 1">
                ,
              </template>
            </template>
          </span>
        </li>
        <li>
          <span>IMDB Link</span>
          <a :href="imdbLink" class="text-blue-200 underline">Link</a>
        </li>
        <li>
          <span>Homepage Link</span>
          <a
            :href="movieDetails.homepage"
            class="text-blue-200 underline"
            >Link</a
          >
        </li>
      </ul>
    </div>
    <p class="mt-[54px]">
      {{ movieDetails.overview }}
    </p>

    <movie-casts
      :castList="castList"
      v-if="castList"
      class="mt-4 md:mt-20"
    ></movie-casts>
  </div>
  <div v-else class="mt-10 text-center font-bold h-48">
    No Data Found
  </div>
</template>

<script>
import { store } from "../../store";
import MovieCasts from "@/components/movies/MovieCasts.vue";
import router from "../../router";

export default {
  components: {
    MovieCasts,
  },
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    loading() {
      return store.loading;
    },
    movieDetails() {
      return store.movieDetails;
    },
    posterPath() {
      return store.imgBaseUrl + this.movieDetails.poster_path;
    },
    imdbLink() {
      return store.imdbBaseLink + this.movieDetails.imdb_id;
    },
    castList() {
      return store.casts;
    },
  },
  methods: {
    formattedPrice(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "’");
    },
    toHoursAndMinutes(totalMinutes) {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);

      return `${hours > 0 ? hours + "h" : ""} ${minutes}m`;
    },
    goToHome() {
      router.push({
        name: "home",
        params: { pageNumberProp: store.pageNumber },
      });
    },
  },
  created() {
    store.getMovieDetail(this.id);
  },
};
</script>
<style lang="scss" scoped>
ul {
  li {
    @apply flex justify-between mb-2.5  last:mb-0 items-center flex-wrap;

    span {
      @apply first:font-bold last:text-sm;
    }
  }
}
</style>
