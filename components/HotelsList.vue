<script setup lang="ts">
import { useHotelsStore } from '~/store/store';
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const { hotels } = storeToRefs(store);
</script>

<template>
  <div v-if="hotels !== []" v-for="hotel in hotels.value">
    <p>{{ hotel.location.city }}</p>
    <ul>
      <li v-for="room in hotel.rooms">maxGuests: {{ room.maxGuests }} available: {{ room.available }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>