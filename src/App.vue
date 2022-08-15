<template>
  <the-header></the-header>
  <main class="container mx-auto pb-24">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
};
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
</style>
