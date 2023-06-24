<script lang="ts" setup>
const { data: cities } = await useFetch('/api/cities');
</script>

<template>
  <form>
    <input type="search"
           list="cities"
           placeholder="Select or type city"

           required>
    <datalist id="cities">
      <option v-for="city in cities" :value="city"></option>
    </datalist>
    <button>Submit</button>
  </form>
</template>
