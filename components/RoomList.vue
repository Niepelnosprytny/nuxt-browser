<script setup lang="ts">
defineProps({
  rooms: {
    type: Array<any>,
    required: true
  },
  available: {
    type: Boolean,
    required: false
  }
});
</script>

<template>
  <div v-for="room in rooms" :class="available ? '' : 'unavailable'">
    <section>
      <p>Area</p>
      <p>{{ room.area }} m<sup>2</sup></p>
    </section>
    <section>
      <p>Maximum of guests</p>
      <p>{{ room.maxGuests }}</p>
    </section>
    <section>
      <p>Beds</p>
      <p>{{ room.beds }}</p>
    </section>
    <section>
      <p>Family room</p>
      <Icon class="icon iconGreen" v-if="room.familyRoom" name="material-symbols:done"/>
      <Icon class="icon iconRed" v-else name="material-symbols:close"/>
    </section>
    <section>
      <p>Breakfast</p>
      <Icon class="icon iconGreen" v-if="room.breakfast" name="material-symbols:done"/>
      <Icon class="icon iconRed" v-else name="material-symbols:close"/>
    </section>
    <section id="price">
      <p>{{ room.price }} <span id="currency">ARS</span></p>
    </section>
  </div>
</template>

<style scoped>
div {
  background-color: #060606;
  margin: 0 auto 0.5rem auto;
  border: 0.1rem solid #F4F4F4;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 60rem;
  height: 6rem;
}

section {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

section > * {
  height: 1.75rem;
  line-height: 1.75rem;
}

section > *:first-child {
  font-weight: 700;
}

#price {
  font-weight: 700;
  font-size: 1.25rem;
}

#currency {
  color: gold;
}

.icon {
  font-size: 1.5rem;
}

.unavailable {
  background-color: #464646;
}

@media (max-width: 1023px) {
  div {
    width: 22.5rem;
    height: 12.5rem;
    padding-top: 0.5rem;
  }

  section {
    margin: 0 1rem;
  }

  #price {
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>