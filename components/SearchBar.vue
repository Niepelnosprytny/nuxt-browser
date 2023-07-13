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
  <div id="searchBarDiv">
    <form @submit.prevent="Search"
          autocomplete="off"
          id="searchBarForm">
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
      <input type="number"
             name="guests"
             class="guestsInput"
             min="1"
             step="1"
             oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
             placeholder="Number of guests"
             required/>
      <button>Search</button>
    </form>
  </div>
</template>

<style>
#searchBarDiv {
  background-color: #AAA000;
  color: #F4F4F4;
  padding-bottom: 5vh;
  width: 100%;
  place-content: center;
}

#searchBarForm {
  margin: auto;
  display: flex;
  flex-direction: row;
}

.dateInput {
  background-color: red;
  padding: 0;
  margin: 0;
  width: 30%;
}

button {
  width: 10%;
  text-indent: 0;
}

.searchInput {
  background-color: black;
  width: 30%;
  margin: 0;
  padding: 0;
}

.guestsInput {
  background-color: blue;
  width: 10%;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  #searchBarForm {
    flex-direction: column;
  }

  .guestsInput,
  .dateInput,
  .searchInput,
  button {
    width: 90%;
  }
}


select,
input,
.dateInput,
button {
  text-indent: 2vh;
  border: 1px solid black;
  font-size: 14px;
  height: 5vh;
}

select,
input,
.dateInput {
//background-color: #F4F4F4;
}

select:focus,
input:focus,
.dateInput:focus {
  border: 1.5px solid black;
}

select:hover,
input:hover,
.dateInput:hover,
button:hover {
  border: 1px solid #666666;
}
</style>
