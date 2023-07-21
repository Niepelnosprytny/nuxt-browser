<script lang="ts" setup>
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";

const store = useHotelsStore();

const {
  city,
  date,
  guests,
  breakfast,
  parking,
  minReviewsScore,
  stars,
  sortBy,
  nothing
} = storeToRefs(store)

function clearData() {
  city.value = "";
  date.value = "";
  guests.value = "";
  breakfast.value = false;
  parking.value = false;
  minReviewsScore.value = 0;
  stars.value = 0;
  sortBy.value = "reviewsAsc";
  nothing.value = true;
}
</script>

<template>
  <NuxtLink @click="clearData" to="/">
    <div>
      <h1>seBooking.com</h1>
    </div>
  </NuxtLink>
</template>

<style scoped>
div {
  background-color: #060606;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
