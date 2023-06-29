<script lang="ts" setup>
import {Ref, ref} from 'vue';

let hotels: Ref = ref([]);

async function Search (form: JSON) {
  hotels.value = await useFetch("/api/hotels", {
    query: {
      "form": form
    }
  }).data;
}
</script>

<template>
  <SearchBar @search="Search" />
  <HotelsList v-if="hotels" :hotels="hotels" />
</template>