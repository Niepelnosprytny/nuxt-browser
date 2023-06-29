<script setup lang="ts">
import {navigateTo, reloadNuxtApp} from "#app";

let loading = false;

async function submitFile(event: { currentTarget: HTMLFormElement | undefined; }) {
  loading = true;
  await fetch("/api/hotels", {
    method: "POST",
    body: new FormData(event.currentTarget)
  }).then(
      async (res) => {
        if (res.status === 200) {
          loading = false;
          alert("Database has been updated successfully");
          await navigateTo("/");
        }
      }
  ).catch(
      (e) => {
        console.log(e);
        alert(e.message);
      }
  );
}
</script>

<template>
  <form v-if="!loading"
        enctype="multipart/form-data"
        @submit.prevent="submitFile">
    <h2>Select data file</h2>
    <input type="file"
           name="file"
           accept="application/json"
           required>
    <br><br>
    <button>Update</button>
  </form>
  <h3 v-else>Processing...</h3>
</template>

<style scoped>
button {
  width: 15%;
  height: 4vh;
}
</style>
