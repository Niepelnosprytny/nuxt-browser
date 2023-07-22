<script setup lang="ts">
const props = defineProps({
  hotel: {
    type: Object,
    required: true
  }
});

const available = ref(true);
const sortBy = ref("priceAsc");
let availableRooms = ref(props.hotel.rooms.filter((room: any) => room.available === true));
let unavailableRooms = ref(props.hotel.rooms.filter((room: any) => room.available === false));

const sortRooms = (a: any, b: any) => {
  const value1 = a.price;
  const value2 = b.price;
  if (value1 < value2) {
    return -1;
  }
  if (value1 > value2) {
    return 1;
  }
  return 0;
}

watch(sortBy, (currentValue) => {
  if (currentValue === "priceAsc") {
    availableRooms.value = availableRooms.value.sort((a: any, b: any) => {
      return sortRooms(a, b)
    });
    unavailableRooms.value = unavailableRooms.value.sort((a: any, b: any) => {
      return sortRooms(a, b)
    });
  }

  if (currentValue === "priceDesc") {
    availableRooms.value = availableRooms.value.sort((a: any, b: any) => {
      return sortRooms(b, a)
    });
    unavailableRooms.value = unavailableRooms.value.sort((a: any, b: any) => {
      return sortRooms(b, a)
    });
  }
});
</script>

<template>
  <div>
    <h1>{{ hotel.name }}</h1>
  </div>
  <section id="mainSection">
    <div class="dataCategoryDiv">
      <h3>Rating</h3>
        <div class="dataBox">
          <p>Stars</p>
          <NuxtRating :ratingValue="hotel.stars" id="stars" rating-size="2rem" active-color="#F00000"/>
        </div>
        <div class="dataBox">
          <p>Reviews score</p>
          <div id="reviewsScoreRow">
            <strong>{{ hotel.reviewsScore }}</strong>
            <Icon id="reviewsScoreIcon" class="icon" name="material-symbols:reviews"/>
          </div>
        </div>
    </div>
    <div class="dataCategoryDiv">
      <h3>Location</h3>
        <div class="dataBox">
          <p>City</p>
          <div>
            <p><strong>{{ hotel.location.city }}</strong></p>
          </div>
        </div>
        <div class="dataBox">
          <p>Post code</p>
          <div>
            <p><strong>{{ hotel.location.postCode }}</strong></p>
          </div>
        </div>
        <div class="dataBox">
          <p>Address</p>
          <div>
            <p><strong>{{ hotel.location.address }}</strong></p>
          </div>
        </div>
    </div>
    <div class="dataCategoryDiv">
      <h3>Conveniences</h3>
      <div class="dataBox">
        <p>Distance from city center</p>
        <div>
          <p><strong>{{ hotel.metadata.distanceFromCenter }} km</strong></p>
        </div>
      </div>
      <div class="dataBox">
        <p>Wifi</p>
        <div>
          <Icon class="icon iconGreen" v-if="hotel.metadata.wifi" name="material-symbols:done"/>
          <Icon class="icon iconRed" v-else name="material-symbols:close"/>
        </div>
      </div>
      <div class="dataBox">
        <p>Parking</p>
        <div>
          <Icon class="icon iconGreen" v-if="hotel.metadata.parking" name="material-symbols:done"/>
          <Icon class="icon iconRed" v-else name="material-symbols:close"/>
        </div>
      </div>
      <div class="dataBox">
        <p>Pets</p>
        <div>
          <Icon class="icon iconGreen" v-if="hotel.metadata.pets" name="material-symbols:done"/>
          <Icon class="icon iconRed" v-else name="material-symbols:close"/>
        </div>
      </div>
      <div class="dataBox">
        <p>Room service</p>
        <div>
          <Icon class="icon iconGreen" v-if="hotel.metadata.roomService" name="material-symbols:done"/>
          <Icon class="icon iconRed" v-else name="material-symbols:close"/>
        </div>
      </div>
    </div>
  </section>
  <div>
    <h2>Rooms</h2>
    <div id="roomSort">
      <button @click="available = !available">Show {{ available ? "avaiable" : "unavailable" }} rooms</button>
      <select v-model="sortBy">
        <option value="priceAsc" selected>Price ascending</option>
        <option value="priceDesc">Price descending</option>
      </select>
    </div>
  </div>
  <RoomList v-if="available" :rooms="availableRooms"/>
  <RoomList v-else :rooms="unavailableRooms"/>
  <h1 v-if="availableRooms.length === 0 && unavailableRooms.length === 0">No rooms to display</h1>
</template>

<style scoped>
#mainSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2rem;
  margin: 1rem auto;
}

.dataCategoryDiv {
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
  width: 60rem;
  border: 0.1rem solid #F4F4F4;
  background-color: #060606;
  justify-content: space-evenly;
}

.dataBox {
  padding: 0.5rem 0 1rem 0;
}


.dataCategoryDiv > * {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

#stars {
  margin: 0 auto;
  width: 10rem;
  justify-content: center;
}

div {
  margin: 0.5rem auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

button, select {
  font-size: 1rem;
  height: 2rem;
}

.dataCategoryDiv > h3 {
  flex-grow: 0;
  margin: 1rem auto;
  font-size: 1.25rem;
}

button {
  background-color: #F0000000;
  border: 0.1rem solid #F00000;
}

button:hover,
button:active {
  background-color: #F00000;
}

#roomSort {
  width: 60rem;
  flex-direction: row;
}

#roomSort > * {
  margin: 0 1rem;
  width: 100%;
}

#reviewsScoreIcon {
  color: gold;
  margin-left: 0.5rem;
}

#reviewsScoreRow {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.5rem;
}

@media (max-width: 1023px) {
  .dataCategoryDiv,
  #roomSort {
    width: 22.5rem;
  }

  #roomSort {
    flex-direction: column;
    height: 5rem;
    justify-content: space-around;;
  }
}
</style>