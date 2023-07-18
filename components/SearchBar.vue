<script lang="ts" setup>
import {ref} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {add} from "date-fns";
import {useHotelsStore} from '~/store/store';

const store = useHotelsStore();
const {setSearchBarValues, searchHotels} = store;

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
  setSearchBarValues({
    city: event.target.city.value,
    date: date["_rawValue"],
    guests: event.target.guests.value
  });
  await searchHotels();
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
             list="cities"
             id="searchInput"
             placeholder="Select or type city"
             required>
      <datalist id="cities">
        <option v-for="city in cities" :value="city">{{ city }}</option>
      </datalist>
      <div id="dateInputDiv">
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
                       format="dd MMM yyyy"
                       :enable-time-picker="false"
                       :partial-range="false"
                       min-range="1"
                       required/>
      </div>
        <input type="number"
               name="guests"
               id="guestsInput"
               min="1"
               step="1"
               oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
               placeholder="<1> guest(s)" />
      <button id="searchButton">Search</button>
    </form>
  </div>
</template>

<style>
#searchBarDiv {
  background-color: #060606;
  color: #F4F4F4;
  padding-bottom: 3rem;
  width: 100%;
}

#searchBarForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#dateInputDiv {
  width: 20rem;
}

#searchButton {
  width: 10rem;
}

#searchInput {
  width: 20rem;
}

#guestsInput {
  width: 10rem;
}

#searchInput,
#guestsInput,
.dateInput,
#searchButton {
  border: 0.1rem solid black;
  font-size: 1.25rem;
  height: 3rem;
}

.dateInput {
  background-color: #F4F4F4;
}

.dateInput:hover {
  border: 0.1rem solid #666666;
}

.dateInput:focus {
  border: 0.15rem solid black;
}

@media (max-width: 1024px) {
  #searchBarForm {
    flex-direction: column;
  }

  #guestsInput,
  #dateInputDiv,
  #searchInput,
  #searchButton {
    width: 20rem;
  }
}
</style>
