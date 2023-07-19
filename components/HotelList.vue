<script lang="ts" setup>
defineProps({
  hotels: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-for="hotel in hotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div class="hotelCard">
        <div id="titleRow">
          <div id="name">
            <p v-if="hotel.name.length <= 33">{{ hotel.name }}</p>
            <p v-else :title="hotel.name">{{ hotel.name.slice(0, 30).trim() }}...</p>
          </div>
          <div id="price">
            <p>{{ room.price }} <span id="currency">ARS</span></p>
          </div>
        </div>
        <div id="detailsRow">
          <div>
            <p>City</p>
            <div>
              <p v-if="hotel.location.city.length <= 18"><strong>{{ hotel.location.city }}</strong></p>
              <p v-else :title="hotel.location.city"><strong>
                {{ hotel.location.city.slice(0, 15).trim() }}...</strong>
              </p>
            </div>
          </div>
          <div>
            <p>Stars</p>
            <div>
              <NuxtRating :ratingValue="hotel.stars" rating-size="20px" active-color="#F00000"/>
            </div>
          </div>
          <div>
            <p>Reviews score</p>
            <div id="reviewsScoreRow">
              <strong>{{ hotel.reviewsScore }}</strong>
              <Icon id="reviewsScoreIcon" class="icon" name="material-symbols:reviews"/>
            </div>
          </div>
          <div>
            <p>Parking</p>
            <div>
              <Icon class="icon iconGreen" v-if="hotel.metadata.parking" name="material-symbols:done"/>
              <Icon class="icon iconRed" v-else name="material-symbols:close"/>
            </div>
          </div>
          <div>
            <p>Breakfast</p>
            <div>
              <Icon class="icon iconGreen" v-if="room.breakfast" name="material-symbols:done"/>
              <Icon class="icon iconRed" v-else name="material-symbols:close"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.hotelCard {
  background-color: #060606;
  color: #F4F4F4;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #F4F4F4;
  height: 10rem;
  width: 42rem;
  margin: 0 0 0.5rem 0.5rem;
}

.hotelCard:hover {
  background-color: #666666;
}

#titleRow, #detailsRow, #reviewsScoreRow {
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#titleRow {
  height: 100%;
  font-weight: 700;
  font-size: 1.25rem;
}

#name, #price {
  display: flex;
}

#name {
  align-items: flex-start;
  margin-left: 3rem;
}

#price {
  align-items: flex-end;
  margin-right: 3rem;
}

#currency {
  color: gold;
}

#detailsRow {
  height: 100%;
  justify-content: space-evenly;
}

#detailsRow > div {
  height: 80%;
  width: 100%;
}

#detailsRow > div > div,
#detailsRow > div > p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 1.5rem;
}

.iconGreen {
  color: green;
}

.iconRed {
  color: red;
}

#reviewsScoreIcon {
  color: gold;
  margin-left: 0.5rem;
}
</style>