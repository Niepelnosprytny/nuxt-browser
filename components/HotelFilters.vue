<script lang="ts" setup>
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
      <div>
        <h3>Sort by</h3>
        <select v-model="sortBy">
          <option value="priceAsc">Price ascending</option>
          <option value="priceDesc">Price descending</option>
          <option value="reviewsAsc" selected>Reviews ascending</option>
          <option value="reviewsDesc">Reviews descending</option>
        </select>
      </div>
      <div>
        <h3>Filters</h3>
        <h4>Stars</h4>
          <NuxtRating v-if="renderStars" @rating-selected="rate => { stars = rate }"
                      id="stars"
                      rating-size="2rem"
                      :rating-value="stars"
                      :read-only="false"
                      active-color="#F00000"/>
          <button @click="clearStars().then(() => { renderStars = true })" id="clearStars">Clear stars</button>
      </div>
      <div>
        <h4>Minimal reviews score</h4>
        <input v-model="minReviewsScore"
               type="number"
               placeholder="Type value between 0 and 10"
               min="0"
               max="10"
               step="0.1"
               oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
      </div>
      <div class="checkboxList">
        <h4>Conveniences </h4>
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
    </section>
</template>


<style scoped>
.mainSection {
  background-color: #262626;
  color: #F4F4F4;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

select,
input,
button {
  height: 2rem;
  width: 15rem;
  text-align: center;
  font-size: 1rem;
}

div {
  margin: 1.5rem auto;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

h4 {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.checkboxList {
  width: 100%;
}

.checkboxDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
}

input[type="checkbox"] {
  margin: 0 0 0 1.5rem;
  height: 1.75rem;
  width: 1.75rem;
}

label {
  font-size: 1rem;
  width: 13rem;
  height: 1.75rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-indent: 0.75rem;
}

#stars {
  margin: 0 auto 1rem auto;
  width: 10rem;
  justify-content: center;
}

#clearStars {
  background-color: #F0000000;
  border: 0.1rem solid #F00000;
}

#clearStars:hover {
  background-color: #F00000;
}

input[type="checkbox"]:hover,
.checkboxLabel:hover {
  background-color: #666666;
  cursor: pointer;
}
</style>