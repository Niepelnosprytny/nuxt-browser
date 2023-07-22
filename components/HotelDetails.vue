<script setup lang="ts">
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
});

const available = ref(true);
const sortBy = ref("priceAsc");
let availableRooms = ref(props.hotel.rooms.filter((room: any) => room.available === true));
let unavailableRooms = ref(props.hotel.rooms.filter((room: any) => room.available === false));

const sortRooms = (a: any, b: any) => {
  const value1 = a.price;
  const value2 = b.price;
  if (value1 < value2) {
    return -1;
  }
  if (value1 > value2) {
    return 1;
  }
  return 0;
}

watch(sortBy, (currentValue) => {
  if (currentValue === "priceAsc") {
    availableRooms.value = availableRooms.value.sort((a: any, b: any) => {
      return sortRooms(a, b)
    });
    unavailableRooms.value = unavailableRooms.value.sort((a: any, b: any) => {
      return sortRooms(a, b)
    });
  }

  if (currentValue === "priceDesc") {
    availableRooms.value = availableRooms.value.sort((a: any, b: any) => {
      return sortRooms(b, a)
    });
    unavailableRooms.value = unavailableRooms.value.sort((a: any, b: any) => {
      return sortRooms(b, a)
    });
  }
});
</script>

<template>
  <div>
    <h1>{{ hotel.name }}</h1>
    <p>Stars: {{ hotel.stars }}</p>
    <p>ReviewsScore: {{ hotel.reviewsScore }}</p>
    <p>Promoted: {{ hotel.promoted }}</p>
  </div>
  <div>
    <h3>Location</h3>
    <ul>
      <li>City: {{ hotel.location.city }}</li>
      <li>Post code: {{ hotel.location.postCode }}</li>
      <li>Address: {{ hotel.location.address }}</li>
    </ul>
  </div>
  <div>
    <h3>Metadata</h3>
    <ul>
      <li>Distance from city center: {{ hotel.metadata.distanceFromCenter }}</li>
      <li>Wifi: {{ hotel.metadata.wifi }}</li>
      <li>Parking: {{ hotel.metadata.parking }}</li>
      <li>Pets: {{ hotel.metadata.parking }}</li>
      <li>Room service: {{ hotel.metadata.parking }}</li>
    </ul>
  </div>
  <div>
    <h3>Rooms</h3>
    <div id="roomSort">
      <button @click="available = !available">Show {{ available ? "avaiable" : "unavailable" }} rooms</button>
      <select v-model="sortBy">
        <option value="priceAsc" selected>Price ascending</option>
        <option value="priceDesc">Price descending</option>
      </select>
    </div>
  </div>
  <RoomList v-if="available" :rooms="availableRooms"/>
  <RoomList v-else :rooms="unavailableRooms"/>
  <h1 v-if="availableRooms.length === 0 && unavailableRooms.length === 0">No rooms to display</h1>
</template>

<style scoped>
body {
  color: #F4F4F4
}

div {
  margin: 0.5rem auto;
  flex-direction: column;
  width: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button, select {
  height: 2rem;
  font-size: 1rem;
}

button {
  background-color: #F0000000;
  border: 0.1rem solid #F00000;
}

button:hover,
button:active {
  background-color: #F00000;
}

#roomSort {
  flex-direction: row;
}

#roomSort > * {
  margin: 0 1rem;
  flex-grow: 1;
}

@media (max-width: 1023px) {
  div {
    width: 22.5rem;
  }

  #roomSort {
    flex-direction: column;
  }

  #roomSort > * {
    width: 100%;
  }

  #roomSort > *:last-child {
    margin-top: 0.5rem;
  }
}
</style>