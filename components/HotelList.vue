<script setup lang="ts">
defineProps({
  hotels: {
    type: Array,
    required: true
  },
  breakfast: {
    type: Boolean,
    required: true
  },
  parking: {
    type: Boolean,
    required: true
  },
  stars: {
    type: String,
    required: true
  },
  minReviewsScore: {
    type: Number,
    required: true
  }
});

const hotelName = ref("Najdłuższa nazwa hotelu, jaką mogę wymyślić");
</script>

<template>
  <div v-if="hotels !== []" v-for="hotel in hotels">
    <div v-for="room in hotel.rooms" :key="hotel.id">
      <div v-if="(breakfast ? room.breakfast === true : true)
        && (parking ? hotel.metadata.parking === true : true)
        && (stars <= hotel.stars)
        && (minReviewsScore <= hotel.reviewsScore)"
           class="hotelCard">
        <div class="hotelName">
          <p v-if="hotel.name.length <= 33">{{ hotel.name }}</p>
          <p v-else :title="hotel.name">{{ hotel.name.slice(0, 30).trim() }}...</p>
        </div>
        <div class="hotelDetails">
          <section>
            <p>City</p>
<!--            <strong>{{ hotel.location.city }}</strong>-->
            <strong v-if="hotel.location.city.length <= 18">{{ hotel.location.city }}</strong>
            <p v-else :title="hotel.location.city"><strong>{{ hotel.location.city.slice(0, 15).trim() }}...</strong></p>
          </section>
          <section>
            <p>Stars</p>
            <strong>{{ hotel.stars }}</strong>
          </section>
          <section>
            <p>Reviews score</p>
            <strong>{{ hotel.reviewsScore }}</strong>
          </section>
          <section>
            <p>Parking</p>
            <strong>{{ hotel.metadata.parking ? "Available" : "Unavailable" }}</strong>
          </section>
          <section>
            <p>Breakfast</p>
            <strong>{{ room.breakfast ? "Available" : "Unavailable" }}</strong>
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
}

section {
  width: 20%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

p, strong {
  padding: 0;
  margin: 0 auto 0.5vh auto;
  font-size: 14px;
}

.hotelCard {
  display: flex;
  flex-direction: row;
  place-content: center;
  height: 7.5vh;
  margin-bottom: 1vh;
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