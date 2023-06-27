<script setup lang="ts">
defineProps({
  hotels: {
    type: Array,
    required: true
  },
})
</script>

<template>
  <div v-for="hotel in hotels.value">
    <p>{{ hotel.location.city }}</p>
    <ul>
      <li v-for="room in hotel.rooms">maxGuests: {{ room.maxGuests }} available: {{ room.available }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>