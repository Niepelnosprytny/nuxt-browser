<script lang="ts" setup>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const date = ref();

let hotels = ref([]);

const Search = async (event) => {
  //@ts-ignore
  hotels.value = await useFetch("/api/hotels", { headers: {
      "form": JSON.stringify({
        city: event.target.city.value,
        date: event.target.date.value,
        guests: event.target.guests.value
      })}}).data;
}

const { data: cities } = await useFetch('/api/cities');
</script>

<template>
  <div v-for="hotel in hotels.value">
    <p>{{ hotel.location.city }}</p>
    <ul>
      <li v-for="room in hotel.rooms">maxGuests: {{ room.maxGuests }} available: {{ room.available }}</li>
    </ul>
  </div>
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
                   ignore-time-validation
                   input-class-name="dateInput"
                   placeholder="Select date"
                   :min-date="new Date()"
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
  margin: 0 10%;
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
