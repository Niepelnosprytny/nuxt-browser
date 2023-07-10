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
          <p>{{ hotel.name }}</p>
        </div>
        <div class="hotelDetails">
          <section>
            <p>City</p>
            <strong>{{ hotel.location.city }}</strong>
          </section>
          <section>
            <p>Stars</p>
            <strong>{{ hotel.stars }}</strong>
          </section>
          <section>
            <p>Reviews score</p>
            <strong>{{ hotel.reviewsScore }}</strong>
          </section>
            <strong>{{ room.parking ? "Parking available" : "No parking available" }}</strong>
            <strong>{{ room.parking ? "Breakfast available" : "No breakfast available" }}</strong>
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