<script lang="ts" setup>
import { ref } from 'vue';

let hotels = ref([]);

async function Search (event: any) {
  //@ts-ignore
  hotels.value = await useFetch("/api/hotels", { headers: {
      "form": JSON.stringify({
        city: event.target.city.value,
        date: event.target.date.value,
        guests: event.target.guests.value
      })}}).data;
}
</script>

<template>
  <SearchBar @search="Search" />
  <HotelsList v-if="hotels !== []" :hotels="hotels" />
</template>