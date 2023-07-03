<script setup lang="ts">
import { useHotelsStore } from '~/store/store';
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useHotelsStore();
const { hotels, promotedHotels } = storeToRefs(store);

const breakfast = ref(false);
</script>

<template>
  <h3>Filters</h3>
  <label for="price-asc">Price ascending</label>
  <input type="radio" name="price" id="price-asc">
  <label for="price-desc">Price descending</label>
  <input type="radio" name="price" id="price-desc">
  <br>

  <label for="stars-asc">Stars ascending</label>
  <input type="radio" name="stars" id="stars-asc">
  <label for="stars-desc">Stars descending</label>
  <input type="radio" name="stars" id="stars-desc">
  <br>

  <label for="reviews-asc">Reviews ascending</label>
  <input type="radio" name="reviews" id="reviews-asc">
  <label for="reviews-desc">Reviews descending</label>
  <input type="radio" name="reviews" id="reviews-desc">
  <br>

  <label for="breakfast">Breakfast</label>
  <input v-model="breakfast" type="checkbox" id="breakfast">
  <br>

  <label for="parking">Parking</label>
  <input type="checkbox" id="parking">

  <div v-if="hotels !== []" v-for="hotel in promotedHotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div v-if="breakfast ? room.breakfast === true : true">
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
        <div v-if="breakfast ? room.breakfast === true : true">
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