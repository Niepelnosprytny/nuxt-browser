<script setup lang="ts">
import {reloadNuxtApp} from "#app";

let loading = false;

async function submitFile(event: any) {
  loading = true;
  await fetch("/api/hotels", {
    method: "POST",
    body: new FormData(event.currentTarget)
  }).then(
      async (res) => {
        if (res.status === 200) {
          loading = false;
          alert("Database has been updated successfully");
          reloadNuxtApp({
            path: `/`
          });
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
    <button>Send</button>
  </form>
  <h3 v-else>Processing...</h3>
</template>

<style scoped>
h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

form {
  margin: 3rem 0 33rem 0;
}

button, input {
  font-size: 1rem;
  width: 20rem;
  height: 3rem;
}
</style>
