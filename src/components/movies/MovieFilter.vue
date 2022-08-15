<template>
  <section class="top-box justify-between px-16">
    <div class="flex items-center">
      <label class="mr-7">search by release Date:</label>
      <Datepicker
        v-model="date"
        modelType="yyyy-MM-dd"
        range
        autoApply
        placeholder="Select Date"
        :enableTimePicker="false"
        class="w-64"
        :format="format"
      ></Datepicker>
    </div>
    <button class="btn px-3" @click.prevent="search">Search</button>
  </section>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { store } from "../../store";
export default {
  components: { Datepicker },

  data() {
    return {
      date: store.date,
      isDisabled: true,
    };
  },


  methods: {
    search() {
      if (this.date != null) {
        store.getMovieListByDate(1, this.date[0], this.date[1]);
      } else if (store.endDate && store.starDate) {
        store.date=null;
        store.getMovieList(1);
      }
    },

    format(date) {
      const FromDay = date[0].getDate();
      const fromMonth = date[0].getMonth() + 1;
      const fromYear = date[0].getFullYear();

      const toDay = date[1].getDate();
      const ToMonth = date[1].getMonth() + 1;
      const ToYear = date[1].getFullYear();

      return `${fromYear}/${fromMonth}/${FromDay} - ${ToYear}/${ToMonth}/${toDay}`;
    },
  },
};
</script>

<style>
.form-input {
  @apply border-customGray-100 ml-7 border border-solid h-8 px-2;
}
</style>
