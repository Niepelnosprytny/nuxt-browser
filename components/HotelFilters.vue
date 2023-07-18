<script setup lang="ts">
import {useHotelsStore} from '~/store/store';

const store = useHotelsStore();
const {
  searchHotels,
  setFilterValues,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReviewsAsc,
  sortByReviewsDesc
} = store;

const breakfast = ref(false);
const parking = ref(false);
const stars = ref(0);
let minReviewsScore = ref(0);
const sortBy = ref("reviewsAsc");
let renderStars = ref(true);

function applyFilters() {
  if(!minReviewsScore.value) {
    minReviewsScore.value = 0;
  }

  setFilterValues({
    breakfast: breakfast,
    parking: parking,
    stars: stars,
    minReviewsScore: minReviewsScore
  });
  searchHotels();
}

watch(sortBy, (currentValue) => {
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

async function clearStars() {
  stars.value = 0;
  renderStars.value = false;
}
</script>

<template>
  <section class="mainSection">
    <nav>
      <h3>Sort by</h3>
      <div class="inputDiv">
        <select v-model="sortBy">
          <option value="priceAsc">Price ascending</option>
          <option value="priceDesc">Price descending</option>
          <option value="reviewsAsc" selected>Reviews ascending</option>
          <option value="reviewsDesc">Reviews descending</option>
        </select>
      </div>

      <h3>Filters</h3>

      <div class="inputDiv">
        <section class="stars">
          <label for="stars">Stars</label>
          <NuxtRating v-if="renderStars" @rating-selected="rate => { stars = rate }"
                      :rating-value="stars"
                      :read-only="false"
                      active-color="#FF0000"
                      id="stars"/>
          <button @click="clearStars().then(() => { renderStars = true })" class="clearStars">Clear stars</button>
        </section>
      </div>

      <div class="inputDiv">
        <label for="minReviewsScore">Minimal reviews score</label>
        <input v-model="minReviewsScore"
               type="number"
               id="minReviewsScore"
               placeholder="Type value between 0 and 10"
               min="0"
               max="10"
               step="0.1"
               oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
        >
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
      <button @click="applyFilters">Apply filters</button>
      <div class="spaceFiller"></div>
    </nav>
  </section>
</template>


<style scoped>
main {
  width: 85%;
}

nav {
  background-color: #CCC000;
  margin: 0;
  padding: 3vh 0;
  display: flex;
  flex-direction: column;
  width: 15%;
  min-height: 100%;
}

.spaceFiller {
  min-height: 100%;
  overflow: hidden;
}

select,
#minReviewsScore,
button {
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
  margin-bottom: 2vh;
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
  height: 100%;
  display: flex;
  flex-direction: column;
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

.stars {
  margin: 0;
}

#stars {
  width: 60%;
}

input[type="checkbox"]:hover,
.checkboxLabel:hover {
  cursor: pointer;
}
</style>