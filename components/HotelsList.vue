<script setup lang="ts">
import { useHotelsStore } from '~/store/store';
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const { hotels, promotedHotels } = storeToRefs(store);
</script>

<template>
  <div v-if="hotels !== []" v-for="hotel in promotedHotels">
    <div v-for="room in hotel.rooms">
      <h3>{{ hotel.name }}</h3>
      <p>City: {{ hotel.location.city }}</p>
      <p>Stars: {{ hotel.stars }}</p>
      <p>Reviews score: {{ hotel.reviewsScore }}</p>
      <p>Parking: {{ hotel.metadata.parking }}</p>
      <p>Promoted: {{ hotel.promoted }}</p>
      <p>Price: {{ room.price }}</p>
      <p>Breakfast: {{ room.breakfast }}</p>
    </div>
  </div>
  <div v-if="hotels !== []" v-for="hotel in hotels">
      <div v-for="room in hotel.rooms">
        <h3>{{ hotel.name }}</h3>
        <p>City: {{ hotel.location.city }}</p>
        <p>Stars: {{ hotel.stars }}</p>
        <p>Reviews score: {{ hotel.reviewsScore }}</p>
        <p>Parking: {{ hotel.metadata.parking }}</p>
        <p>Promoted: {{ hotel.promoted }}</p>
        <p>Price: {{ room.price }}</p>
        <p>Breakfast: {{ room.breakfast }}</p>
      </div>
  </div>
</template>