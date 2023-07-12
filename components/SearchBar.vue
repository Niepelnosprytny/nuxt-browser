<script lang="ts" setup>
import {ref} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {add} from "date-fns";
import {useHotelsStore} from '~/store/store';

const store = useHotelsStore();
const {searchHotels} = store;

const date = ref();
let minDate: Date | String;

if (new Date().getHours() > 15) {
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
  await searchHotels(form);
}

const {data: cities} = await useFetch('/api/cities');
</script>

<template>
  <form @submit.prevent="Search"
        autocomplete="off"
        class="container-fluid d-flex justify-content-center pt-5 pb-5">
      <input type="search"
             name="city"
             class="col-3"
             list="cities"
             placeholder="Select or type city"
             required>
      <datalist id="cities">
        <option v-for="city in cities" :value="city"></option>
      </datalist>
      <section class="p-0 col-3">
        <VueDatePicker v-model="date"
                       name="date"
                       range
                       multi-calendars
                       vertical
                       text-input
                       auto-apply
                       hide-input-icon
                       prevent-min-max-navigation
                       input-class-name="dateInput"
                       placeholder="Select date"
                       :min-date="minDate"
                       format="dd MMMM yyyy (EEEE)"
                       :enable-time-picker="false"
                       :partial-range="false"
                       min-range="1"
                       required/>
      </section>
      <input type="number"
             name="guests"
             class="col-1"
             min="1"
             step="1"
             oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
             placeholder="Guests number"
             required/>
      <button class="col-1">Search</button>
  </form>
</template>

<style>
.dateInput {
  background-color: #F4F4F4;
  border: 0.1rem solid black;
  font-size: 1rem;
  text-indent: 1rem;
}

.dateInput:focus {
  border: 0.15rem solid black;
}

.dateInput:hover {
  border: 0.15rem solid #666666;
}
</style>

<style scoped>
form {
  background-color: #AAA000;
  color: #F4F4F4;
}
</style>
