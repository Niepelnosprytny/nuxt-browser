<script setup lang="ts">
function submitFile (event: { currentTarget: HTMLFormElement | undefined; }) {
  fetch("/api/hotels", {
    method: "POST",
    body: new FormData(event.currentTarget)
  })
}
</script>

<template>
  <h1>Select file to insert</h1>
  <form enctype="multipart/form-data"
        @submit.prevent="submitFile">
    <input type="file"
           name="file"
           accept="application/json">
    <br><br>
    <input type="submit" value="Submit">
  </form>
</template>

<style>
body {
  background-color: #060606;
  color: #f4f4f4;
}
</style>
