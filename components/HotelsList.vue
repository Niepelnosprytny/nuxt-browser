<script setup lang="ts">
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";
import TheList from "~/components/TheList.vue";

const store = useHotelsStore();
const {hotels, promotedHotels} = storeToRefs(store);
const {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReviewsAsc,
  sortByReviewsDesc
} = store;

const breakfast = ref(false);
const parking = ref(false);
const stars = ref("1");
const sortBy = ref("reviewsAsc");

watch(sortBy, async (currentValue) => {
  switch (currentValue) {
    case "priceAsc":
      sortByPriceAsc();
      break;
    case "priceDesc":
      sortByPriceDesc();
      break;
    case "reviewsAsc":
      sortByReviewsAsc();
      break;
    case "reviewsDesc":
      sortByReviewsDesc();
      break;
  }
});
</script>

<template>
  <h3>Filters</h3>
  <select v-model="sortBy">
    <option value="priceAsc">Price ascending</option>
    <option value="priceDesc">Price descending</option>
    <option value="reviewsAsc" selected>Reviews ascending</option>
    <option value="reviewsDesc">Reviews descending</option>
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

  <TheList v-if="promotedHotels !== []"
           :hotels="promotedHotels"
           :breakfast="breakfast"
           :parking="parking"
           :stars="stars"/>
  <TheList v-if="hotels !== []"
           :hotels="hotels"
           :breakfast="breakfast"
           :parking="parking"
           :stars="stars"/>
</template>