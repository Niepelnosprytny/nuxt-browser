<script setup lang="ts">
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const {hotels, promotedHotels} = storeToRefs(store);

const breakfast = ref(false);
const parking = ref(false);
const stars = ref(3);
</script>

<template>
  <h3>Filters</h3>
  <select name="sortBy">
    <option>Price ascending</option>
    <option>Price descending</option>
    <option selected>Reviews ascending</option>
    <option>Reviews descending</option>
  </select>

  <select name="stars" v-model="stars">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>

  <label for="breakfast">Breakfast</label>
  <input v-model="breakfast" type="checkbox" id="breakfast">

  <label for="parking">Parking</label>
  <input v-model="parking" type="checkbox" id="parking">
  <br>

  <div v-if="hotels !== []" v-for="hotel in promotedHotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div v-if="(breakfast ? room.breakfast === true : true)
        && (parking ? hotel.metadata.parking === true : true)
        && (stars <= hotel.stars)">
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
  </div>
  <div v-if="hotels !== []" v-for="hotel in hotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div v-if="(breakfast ? room.breakfast === true : true)
        && (parking ? hotel.metadata.parking === true : true)
        && (stars <= hotel.stars)">
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
  </div>
</template>