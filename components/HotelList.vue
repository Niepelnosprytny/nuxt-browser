<script lang="ts" setup>
defineProps({
  hotels: {
    type: Array,
    required: true
  }});
</script>

<template>
    <div v-if="hotels.length > 0" v-for="hotel in hotels">
      <div v-for="room in hotel.rooms" :key="hotel.id">
        <div
             class="hotelCard">
          <div class="hotelName">
            <p v-if="hotel.name.length <= 33">{{ hotel.name }}</p>
            <p v-else :title="hotel.name">{{ hotel.name.slice(0, 30).trim() }}...</p>
          </div>
          <div class="hotelDetails">
            <section>
              <p>City</p>
              <p v-if="hotel.location.city.length <= 18"><strong>{{ hotel.location.city }}</strong></p>
              <p v-else :title="hotel.location.city"><strong>{{ hotel.location.city.slice(0, 15).trim() }}...</strong></p>
            </section>
            <section>
              <p>Stars</p>
              <p>
                <NuxtRating :ratingValue="hotel.stars" rating-size="20px" active-color="gold"/>
              </p>
            </section>
            <section>
              <p>Reviews score</p>
              <p>
                <strong>{{ hotel.reviewsScore }}</strong>
                <Icon name="material-symbols:reviews" color="blue" size="20px"/>
              </p>
            </section>
            <section>
              <p>Parking</p>
              <p v-if="hotel.metadata.parking">
                <Icon name="material-symbols:done" color="green" size="20px"/>
              </p>
              <p v-else>
                <Icon name="material-symbols:close" color="red" size="20px"/>
              </p>
            </section>
            <section>
              <p>Breakfast</p>
              <p v-if="room.breakfast">
                <Icon name="material-symbols:done" color="green" size="20px"/>
              </p>
              <p v-else>
                <Icon name="material-symbols:close" color="red" size="20px"/>
              </p>
            </section>
          </div>
          <div class="hotelPrice">
            <p>{{ room.price }} ARS</p>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  margin: 0;
  padding: 0;
}

section {
  width: 20%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

p {
  padding: 0;
  margin: 0 auto 0.5vh auto;
  font-size: 14px;
}

.hotelCard {
  background-color: #DDD000;
  display: flex;
  flex-direction: row;
  place-content: center;
  border: 1px solid black;
  height: 7.5vh;
  width: 100%;
}

.hotelCard:hover {
  background-color: #BBB000;
}

.hotelName,
.hotelName > p {
  text-align: left;
  padding-left: 5vh;
  font-size: 20px;
  font-weight: bold;
  width: 150%;
}

.hotelDetails {
  flex-direction: row;
  width: 250%;
  align-items: center;
}

.hotelPrice,
.hotelPrice > p {
  text-align: right;
  padding-right: 5vh;
  font-size: 20px;
  font-weight: bold;
}
</style>