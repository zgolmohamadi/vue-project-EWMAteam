<template>
  <the-header></the-header>
  <main class="container mx-auto pb-24">
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
};
</script>

<style></style>
