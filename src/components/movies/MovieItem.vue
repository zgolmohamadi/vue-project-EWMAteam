<template>
  <base-card class="mb-8 flex h-48 relative">
    <img
      :src="posterSrc"
      alt="poster-img"
      title="poster-image"
      class="w-32"
    />
    <div class="flex flex-col justify-between grow p-3">
      <span class="font-bold leading-5">{{ title }}</span>
      <div>
        <div class="flex items-center text-xs font-normal">
          <span class="date"></span>
          {{ date }}
        </div>
        <ul
          class="flex flex-wrap gap-x-3 genres mt-3.5 leading-4 max-h-16"
        >
          <li
            class="text-xs relative"
            v-for="genre in genresNames"
            :key="genre + id"
          >
            {{ genre }}
          </li>
        </ul>
      </div>
    </div>
    <router-link :to="DetailsLink" class="absolute w-full h-full top-0 left-0">
    </router-link>
  </base-card>
</template>

<script>
import { store } from "../../store";
import BaseCard from "../ui/BaseCard.vue";
export default {
  components: { BaseCard },
  props: ["poster", "title", "date", "id", "genreIds"],
  computed: {
    posterSrc() {
      return store.imgBaseUrl + this.poster;
    },
    genresNames() {
      if (store.moviesGenres) {
        return this.genreIds.map((genreId) => {
          return store.moviesGenres.find((g) => g.id === genreId)
            .name;
        });
      }
    },
    DetailsLink() {
      return  '/movie/' + this.id; 
    },
  },
};
</script>

<style>
.date {
  @apply w-4 h-4  inline-block bg-cover bg-center mr-2;
  background-image: url("@/assets/calendare.png");
}
.genres {
  min-height: 28px;
  overflow: hidden;
}
.genres li:not(:last-child):after {
  content: "•";
  position: absolute;
  right: -8px;
}
</style>
