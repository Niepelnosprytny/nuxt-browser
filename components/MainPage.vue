<script lang="ts" setup>
import {useHotelsStore} from "~/store/store";
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const {hotels, promotedHotels, searchBarValues} = storeToRefs(store);
let width = ref();

onBeforeMount(() => {
  width.value = window.innerWidth;
});
</script>

<template>
  <div v-if="JSON.stringify(searchBarValues) === '{}'" class="mainDiv" id="mainPlaceholder">
    <Icon name="material-symbols:hotel" id="hotelIcon"/>
    <h1>Find perfect hotel in best price!</h1>
  </div>
  <div v-else class="mainDiv">
    <div id="mainHotels">
      <HotelFilters v-if="width > 1024" id="filters"/>
      <button v-if="width <= 1024" id="showFilters">Show filters and sorting</button>
      <div id="hotelsList">
        <HotelList v-if="promotedHotels.length > 0" :hotels="promotedHotels"/>
        <HotelList v-if="hotels.length > 0" :hotels="hotels"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}

#mainPlaceholder {
  background-color: #262626;
  color: #F4F4F4;
  height: 45rem;
}

#mainHotels {
  display: flex;
  align-items: flex-start;
  margin-top: 0.5rem;
}

#hotelIcon {
  color: #F4F4F4;
  font-size: 25rem;
}

#filters {
  width: 17.5rem;
  position: sticky;
  align-self: flex-start;
  top: 0;
  overflow-y: auto;
}

#hotelsList {
  width: 42.5rem;
}

h1 {
  margin-left: 5rem;
  font-size: 5rem;
  width: 35rem;
}

@media (max-width: 1024px) {
  #mainPlaceholder {
    height: 100%;
    flex-direction: column;
  }

  #mainHotels {
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
  }

  #hotelIcon {
    font-size: 15rem;
  }

  h1 {
    margin: 2rem 0 5rem 0;
    font-size: 2.5rem;
    width: 100%;
  }

  #showFilters {
    width: 22.5rem;
    height: 2rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    background-color: #060606;
    border: 0.1rem solid #F00000;
  }

  #showFilters:hover,
  #showFilters:active {
    background-color: #F00000;
  }
}
</style>