<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {add} from "date-fns";
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const {
  city,
  date,
  guests
} = storeToRefs(store);
const {searchHotels} = store;

let minDate: Date | String;

if (new Date().getHours() > 15) {
  minDate = add(new Date(), {
    days: 1,
  });
} else {
  minDate = new Date();
}

const {data: cities} = await useFetch('/api/cities');
</script>

<template>
  <div id="searchBarDiv">
    <form @submit.prevent="async () => { await searchHotels(); }"
          autocomplete="off"
          id="searchBarForm">
      <input v-model="city" type="search"
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
                       text-input
                       auto-apply
                       hide-input-icon
                       prevent-min-max-navigation
                       input-class-name="dateInput"
                       calendar-class-name="calendar"
                       placeholder="Select date"
                       :min-date="minDate"
                       format="dd MMM yyyy"
                       :enable-time-picker="false"
                       :partial-range="false"
                       min-range="1"
                       required/>
      </div>
      <input v-model="guests" type="number"
             name="guests"
             id="guestsInput"
             min="1"
             step="1"
             oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
             placeholder="<1> guest(s)"/>
      <button id="searchButton">Search</button>
    </form>
  </div>
</template>

<style>
#searchBarDiv {
  background-color: #060606;
  padding-bottom: 3rem;
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
  font-size: 1.25rem;
  height: 3rem;
}

.dateInput {
  border-radius: 0.35rem;
  border: 0.15rem solid #060606;
  background-color: #F4F4F4;
}

.dateInput:focus,
.dateInput:active {
  outline: 0.1rem solid #F4F4F4;
}

@media (max-width: 1023px) {
  #searchBarForm {
    flex-direction: column;
  }

  #guestsInput,
  #dateInputDiv,
  #searchInput,
  #searchButton {
    width: 20rem;
  }

  .calendar {
    width: 18rem;
  }
}
</style>
