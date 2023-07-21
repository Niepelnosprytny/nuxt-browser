<script setup lang="ts">
const route = useRoute();
const id = route.params.handle;

const hotel = await useFetch(`/api/hotels/${id}`).data;
</script>

<template>
  <HotelDetails :hotel="hotel[0]" />
</template>