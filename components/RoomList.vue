<script setup lang="ts">
defineProps({
  rooms: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-for="room in rooms">
    <section>
      <p>Price</p>
      <p>{{ room.price }}</p>
    </section>
    <section>
      <p>Max guests</p>
      <p>{{ room.maxGuests }}</p>
    </section>
    <section>
      <p>Beds</p>
      <p>{{ room.beds }}</p>
    </section>
    <section>
      <p>Family room</p>
      <p>{{ room.familyRoom }}</p>
    </section>
    <section>
      <p>Area</p>
      <p>{{ room.area }}</p>
    </section>
    <section>
      <p>Breakfast</p>
      <p>{{ room.breakfast }}</p>
    </section>
    <section>
      <p>Available</p>
      <p>{{ room.available }}</p>
    </section>
  </div>
</template>

<style scoped>
div {
  display: inline-flex;
  flex-direction: red;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

section {
  flex-direction: column;
}
</style>