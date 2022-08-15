<template>
  <div>
    <span class="text-lg font-bold">Credit:</span>
    <div class="mt-3">
      <span v-for="(cast, index) in castList" :key="cast.cast_id" class="text-sm">
        <template v-if="index > 0">,</template>
        {{ cast.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["castList"],
};
</script>

<style></style>
