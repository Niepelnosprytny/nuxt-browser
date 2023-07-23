<script setup lang="ts">
import {reloadNuxtApp} from "#app";

function redirectToHomepage() {
  reloadNuxtApp({
    path: `/`
  });
}
</script>

<template>
    <div @click="redirectToHomepage">
      <h1>seBooking.com</h1>
    </div>
</template>

<style scoped>
div {
  cursor: pointer;
  background-color: #060606;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
</style>
