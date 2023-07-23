<script setup lang="ts">
import {useHotelsStore} from "~/store/store";
import {storeToRefs} from "pinia";

let viewport = ref(useViewport());

const store = useHotelsStore();
const {hotels, promotedHotels, nothing} = storeToRefs(store);
let renderModal = ref(false);

function closeModal() {
  renderModal.value = false;
}
</script>

<template>
  <div v-if="nothing"
       class="mainDiv"
       id="mainPlaceholder">
    <Icon name="material-symbols:hotel"
          id="hotelIcon"/>
    <h1>Find perfect hotel in best price!</h1>
  </div>
  <div v-else
       class="mainDiv">
    <div id="mainHotels">
      <HotelFilters v-if="viewport.isGreaterThan('tablet')"
                    :renderClose="false"
                    class="filters"/>
      <button v-else
              @click="renderModal = !renderModal"
              id="showFilters">
        Show filters and sorting
      </button>
      <div v-if="renderModal"
           @click="closeModal"
           class="modal">
        <HotelFilters
            @close="closeModal"
            @click.stop :renderClose="renderModal"
            class="filters modalFilters"/>
      </div>
      <div id="hotelsList">
        <p v-if="promotedHotels.length === 0 && hotels.length === 0"
           class="empty">
          No hotels match your query
        </p>
        <HotelList v-if="promotedHotels.length > 0"
                   :hotels="promotedHotels"/>
        <HotelList v-if="hotels.length > 0"
                   :hotels="hotels"/>
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
  height: 45rem;
}

#mainHotels {
  display: flex;
  align-items: flex-start;
  margin-top: 0.5rem;
}

#hotelIcon {
  font-size: 25rem;
}

.empty {
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43rem;
}

.filters {
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

@media (max-width: 1023px) {
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

  .empty {
    width: 22.5rem;
    margin: auto;
  }

  #hotelIcon {
    font-size: 15rem;
  }

  h1 {
    margin: 2rem 0 5rem 0;
    font-size: 2.5rem;
    width: 22.5rem;
  }

  #showFilters {
    width: 22.5rem;
    height: 2rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    background-color: #F0000000;
    border: 0.1rem solid #F00000;
  }

  #showFilters:hover,
  #showFilters:active {
    background-color: #F00000;
  }

  .modal {
    z-index: 9998;
    display: flex;
    position: fixed;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFFFFF88;
  }

  .modalFilters {
    z-index: 9999;
    width: 22.5rem;
    margin: auto;
  }
}
</style>