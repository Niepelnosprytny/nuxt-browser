<script lang="ts" setup>
import { useHotelsStore } from '~/store/store';
import { storeToRefs } from "pinia";

const store = useHotelsStore();
const { hotels } = storeToRefs(store);
const { searchHotels } = store;

async function Search (form: JSON) {
  await searchHotels(form);
}
</script>

<template>
  <SearchBar @search="Search" />
  <HotelsList v-if="hotels" :hotels="hotels" />
</template>