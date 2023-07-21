<script lang="ts" setup>
import {useHotelsStore} from '~/store/store';
import {storeToRefs} from "pinia";
import {renderCom} from "nitropack/dist/nitro-169e6e27";

const emit = defineEmits(["close"]);
defineProps({
  renderClose: {
    type: Boolean,
    required: true
  }
});

const store = useHotelsStore();
const {
  sortBy,
  stars,
  minReviewsScore,
  breakfast,
  parking
} = storeToRefs(store);

const {
  searchHotels,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReviewsAsc,
  sortByReviewsDesc
} = store;

let renderStars = ref(true);
let minReviewsScoreVisible = ref(minReviewsScore.value.toString());

function applyFilters() {
  searchHotels();
}

watch(minReviewsScoreVisible, (currentValue) => {
  if (!currentValue) {
    minReviewsScore.value = 0;
  } else {
    minReviewsScore.value = parseInt(currentValue);
  }
});

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

watch(stars, () => {
  applyFilters();
});

watch(minReviewsScore, (currentValue) => {
  applyFilters();

  if(currentValue == 0) {
    minReviewsScoreVisible.value = "";
  }
}, {
  immediate: true
});

watch(breakfast, () => {
  applyFilters();
});

watch(parking, () => {
  applyFilters();
});

async function clearStars() {
  stars.value = 0;
  renderStars.value = false;
}
</script>

<template>
  <section class="mainSection">
    <div id="iconDIv" v-if="renderClose">
      <Icon
          @click="emit('close')"
            class="icon"
            name="material-symbols:close"/>
    </div>
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
      <button v-if="stars > 0"
              @click="clearStars().then(() => { renderStars = true })"
              id="clearStars">Clear stars
      </button>
    </div>
    <div>
      <h4>Minimal reviews score</h4>
      <input v-model="minReviewsScoreVisible"
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
  </section>
</template>


<style scoped>
.mainSection {
  background-color: #060606;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid #F4F4F4;
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
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;
}

#stars {
  margin: 0 auto;
  width: 10rem;
  justify-content: center;
}

#clearStars {
  margin-top: 1rem;
  background-color: #F0000000;
  border: 0.1rem solid #F00000;
}

#clearStars:hover,
#clearStars:active {
  background-color: #F00000;
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

input[type="checkbox"] {
  height: 1.75rem;
  width: 1.75rem;
  outline: none;
}

input[type="checkbox"]:hover,
.checkboxLabel:hover {
  background-color: #666666;
  cursor: pointer;
}

#iconDIv {
  margin: 0 0 -3rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.icon {
  font-size: 5rem;
  color: #F4F4F4;
}
</style>