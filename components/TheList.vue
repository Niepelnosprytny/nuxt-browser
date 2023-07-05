<script setup lang="ts">
defineProps({
  hotels: {
    type: Array,
    required: true
  },
  breakfast: {
    type: Boolean,
    required: true
  },
  parking: {
    type: Boolean,
    required: true
  },
  stars: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div v-if="hotels !== []" v-for="hotel in hotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div v-if="(breakfast ? room.breakfast === true : true)
        && (parking ? hotel.metadata.parking === true : true)
        && (stars <= hotel.stars)">
        <h3>{{ hotel.name }}</h3>
        <h4>{{ room.price }} PLN</h4>
        <p>City: {{ hotel.location.city }}</p>
        <p>Stars: {{ hotel.stars }}</p>
        <p>Reviews score: {{ hotel.reviewsScore }}</p>
        <p>Parking: {{ hotel.metadata.parking }}</p>
        <p>Promoted: {{ hotel.promoted }}</p>
        <p>Breakfast: {{ room.breakfast }}</p>
      </div>
    </div>
  </div>
</template>