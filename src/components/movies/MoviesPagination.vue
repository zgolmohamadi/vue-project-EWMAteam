<template>
  <div class="mt-[160px] flex justify-center h-10">
    <button
      class="pr-8 text-blue-200 font-bold disabled:text-black-450"
      @click.prevent="$emit('goPrevious', 'prev')"
      :disabled="prevIsDisable"
    >
      Previous Page
    </button>
    <button
      class="pl-8 text-blue-200 font-bold border-l border-black-450 disabled:text-black-450"
      @click.prevent="$emit('goNext', 'next')"
      :disabled="nextIsDisable"
    >
      Next Page
    </button>
  </div>
  <span
    class="text-center block mt-4 text-customGray-200"
    v-if="showResultsNumber"
  >
    Showing results {{ from }}-{{ to }}</span
  >
</template>

<script>
export default {
  props: ["pageNumber", "from", "to", "totalPage"],
  emits: ["goPrevious", "goNext"],

  computed: {
    prevIsDisable() {
      return this.pageNumber === 1;
    },
    nextIsDisable() {
      return this.totalPage === this.pageNumber;
    },
    showResultsNumber() {
      return this.to != null && this.from != null;
    },
  },
};
</script>

<style></style>
