<script lang="ts" setup>
import {useHotelsStore} from "~/store/store";
import {storeToRefs} from "pinia";

const store = useHotelsStore();
const {hotels, promotedHotels, searchBarValues} = storeToRefs(store);
</script>

<template>
  <div v-if="JSON.stringify(searchBarValues) === '{}'" class="mainDiv" id="mainPlaceholder">
    <Icon name="material-symbols:hotel" id="hotelIcon"/>
    <h1>Find perfect hotel in best price!</h1>
  </div>
  <div v-else class="mainDiv">
      <div id="mainHotels">
        <HotelFilters id="filters" />
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
}

#hotelIcon {
  color: #F4F4F4;
  font-size: 25rem;
}

#filters {
  width: 20rem;
  position: sticky;
  align-self: flex-start;
  top: 0;
  overflow-y: auto;
}

#hotelsList {
  width: 50rem;
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

  #hotelIcon {
    font-size: 15rem;
  }

  h1 {
    margin: 2rem 0 5rem 0;
    font-size: 2.5rem;
    width: 100%;
  }
}
</style>