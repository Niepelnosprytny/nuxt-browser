<script lang="ts" setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {add} from "date-fns";

const emit = defineEmits(['search']);

const date = ref();
let minDate: Date | String;

if(new Date().getHours() > 15) {
  minDate = add(new Date(), {
    days: 1,
  });
} else {
  minDate = new Date();
}

const Search = async (event: any) => {
  const form = {
    city: event.target.city.value,
    date: date["_rawValue"],
    guests: event.target.guests.value
  };
  emit('search', JSON.stringify(form));
}

const { data: cities } = await useFetch('/api/cities');
</script>

<template>
  <form @submit.prevent="Search">
    <input type="search"
           name="city"
           class="searchInput"
           list="cities"
           placeholder="Select or type city"
           required>
    <datalist id="cities">
      <option v-for="city in cities" :value="city"></option>
    </datalist>
    <VueDatePicker v-model="date"
                   name="date"
                   range
                   multi-calendars
                   vertical
                   text-input
                   auto-apply
                   prevent-min-max-navigation
                   input-class-name="dateInput"
                   placeholder="Select date"
                   :min-date="minDate"
                   format="dd MMMM yyyy (EEEE)"
                   :enable-time-picker="false"
                   :partial-range="false"
                   min-range="1"
                   required />
    <input type="number"
           name="guests"
           class="guestsInput"
           min="1"
           step="1"
           oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
           placeholder="Number of guests"
           required />
    <button>Submit</button>
  </form>
</template>

<style scoped>
form {
  margin: 0 10% 5% 10%;
}

button {
  width: 10%;
  height: 5vh;
  float: left;
}

.searchInput {
  width: 30%;
  height: 5vh;
  float: left;
}

.guestsInput {
  width: 10%;
  height: 5vh;
  float: left;
}
</style>

<style>
.dateInput {
  width: 30%;
  height: 5vh;
  float: left;
}
</style>
