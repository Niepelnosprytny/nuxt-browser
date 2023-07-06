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
const minReviewsScore = ref(0.1);
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
  <section class="mainSection">
    <nav>
      <h3>Filters and sorting</h3>
      <div class="inputDiv">
        <label for="sortBy">Sort by</label>
        <select v-model="sortBy" id="sortBy">
          <option value="priceAsc">Price ascending</option>
          <option value="priceDesc">Price descending</option>
          <option value="reviewsAsc" selected>Reviews ascending</option>
          <option value="reviewsDesc">Reviews descending</option>
        </select>
      </div>

      <div class="inputDiv">
        <label for="stars">Stars</label>
        <select v-model="stars" id="stars">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div class="inputDiv">
        <label for="minReviewsScore">Minimal reviews score</label>
        <input v-model="minReviewsScore"
               type="number"
               id="minReviewsScore"
               min="0"
               step="0.1"
               oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
      </div>

      <h4>Additional filters</h4>

      <div class="checkboxList">
        <section class="checkboxDiv">
          <input v-model="breakfast" type="checkbox" id="breakfast">
          <label for="breakfast" class="checkboxLabel">Breakfast</label>
        </section>
        <section class="checkboxDiv">
          <input v-model="parking" type="checkbox" id="parking">
          <label for="parking" class="checkboxLabel">Parking</label>
        </section>
      </div>
    </nav>
    <main v-if="true">
      <HotelList v-if="promotedHotels !== []"
                 :hotels="promotedHotels"
                 :breakfast="breakfast"
                 :parking="parking"
                 :stars="stars"
                 :minReviewsScore="minReviewsScore !== '' ? minReviewsScore : 0"/>
      <HotelList v-if="hotels !== []"
                 :hotels="hotels"
                 :breakfast="breakfast"
                 :parking="parking"
                 :stars="stars"
                 :minReviewsScore="minReviewsScore !== '' ? minReviewsScore : 0"/>
    </main>
    <h3 v-else class="nothing">No rooms match your query</h3>
  </section>
</template>

<style scoped>
main {
  width: 85%;
}

nav {
  display: inline-flex;
  flex-direction: column;
  width: 15%;
  height: 100%;
}

select,
#minReviewsScore {
  margin: auto;
  min-width: 80%;
  max-width: 80%;
  height: 3vh;
  text-align: center;
  font-size: 14px;
  text-indent: 0;
}

div {
  margin: 2vh auto;
}

label {
  font-size: 16px;
}

h3 {
  margin: 0 auto 1vh auto;
  font-size: 20px;
}

h4 {
  margin: 0 auto;
  font-size: 18px;
}

.inputDiv {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 7.5vh;
}

.mainSection {
  display: flex;
  flex-direction: row;
  min-height: 70vh;
}

.checkboxList {
  min-width: 100%;
}

.checkboxDiv {
  width: 100%;
  flex-direction: row;
  margin: 0.5vh 0;
  text-align: left;;
}

input[type="checkbox"] {
  margin: 0 2.5% 0 7.5%;
  height: 2vh;
  width: 2vh;
}

.nothing {
  margin: auto;
  padding-right: 15%;
}

input[type="checkbox"]:hover,
.checkboxLabel:hover {
  cursor: pointer;
}
</style>