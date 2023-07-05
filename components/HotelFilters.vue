<script setup lang="ts">
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";

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
const stars = ref("0");
const minReviewsScore = ref("0");
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
  <section>
    <nav>
      <div>
        <label for="sortBy">Sort by: </label>
        <select v-model="sortBy" id="sortBy">
          <option value="priceAsc">Price ascending</option>
          <option value="priceDesc">Price descending</option>
          <option value="reviewsAsc" selected>Reviews ascending</option>
          <option value="reviewsDesc">Reviews descending</option>
        </select>
      </div>

      <div>
        <label for="stars">Stars: </label>
        <select v-model="stars" id="stars">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div>
        <label for="minReviewsScore">Minimal reviews score</label>
        <input v-model="minReviewsScore"
               type="text"
               id="minReviewsScore"
               min="0"
               step="0.1"
               oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
      </div>

      <div class="checkboxList">
        <h3>Filters</h3>
        <div class="checkboxDiv">
          <input v-model="breakfast" type="checkbox" id="breakfast">
          <label for="breakfast" class="checkboxLabel">Breakfast</label>
        </div>
        <div class="checkboxDiv">
          <input v-model="parking" type="checkbox" id="parking">
          <label for="parking" class="checkboxLabel">Parking</label>
        </div>
      </div>
    </nav>
    <main>
      <HotelList v-if="promotedHotels !== []"
                 :hotels="promotedHotels"
                 :breakfast="breakfast"
                 :parking="parking"
                 :stars="stars"
                 :minReviewsScore="minReviewsScore"/>
      <HotelList v-if="hotels !== []"
                 :hotels="hotels"
                 :breakfast="breakfast"
                 :parking="parking"
                 :stars="stars"
                 :minReviewsScore="minReviewsScore"/>
    </main>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
}

main {
  width: 90%;
}

nav {
  display: inline-flex;
  flex-direction: column;
  width: 15%;
  float: left;
  height: 100%;
}

select,
#minReviewsScore {
  width: 20vh;
  height: 3vh;
}

div {
  margin: 3vh auto;
  display: inline-flex;
  flex-direction: column;
}

.checkboxList {
  width: 100%;
}

.checkboxDiv {
  flex-direction: row;
  margin: 0.5vh 20%;
;
}

input[type="checkbox"]:hover,
.checkboxLabel:hover {
  cursor: pointer;
}
</style>