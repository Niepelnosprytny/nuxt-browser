<script lang="ts" setup>
import {useHotelsStore} from '~/store/store';
const store = useHotelsStore();
const {setSearchBarValues, setFilterValues} = store;

function clearData() {
  setSearchBarValues({});
  setFilterValues({
    breakfast: false,
    parking: false,
    stars: 0,
    minReviewsScore: 0
  });
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
