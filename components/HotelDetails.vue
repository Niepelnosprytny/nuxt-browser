<script setup lang="ts">
defineProps({
  hotel: {
    type: undefined,
    required: true
  }
});
</script>

<template>
<h1>{{ hotel.name }}</h1>
  <p>Stars: {{ hotel.stars }}</p>
  <p>ReviewsScore: {{ hotel.reviewsScore }}</p>
  <p>Promoted: {{ hotel.promoted }}</p>
  <h3>Location</h3>
  <ul>
    <li>City: {{ hotel.location.city }}</li>
    <li>Post code: {{ hotel.location.postCode }}</li>
    <li>Address: {{ hotel.location.address }}</li>
  </ul>
  <h3>Metadata</h3>
  <ul>
    <li>Distance from city center: {{ hotel.metadata.distanceFromCenter }}</li>
    <li>Wifi: {{ hotel.metadata.wifi }}</li>
    <li>Parking: {{ hotel.metadata.parking }}</li>
    <li>Pets: {{ hotel.metadata.parking }}</li>
    <li>Room service: {{ hotel.metadata.parking }}</li>
  </ul>
  <h3>Available rooms</h3>
  <RoomList :rooms="hotel.rooms" />
  <h3>unavailable rooms</h3>
  <RoomList :rooms="hotel.rooms" />
</template>

<style scoped>
* {
  color: #F4F4F4
}
</style>