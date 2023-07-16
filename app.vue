<template>
  <div>
    <NuxtLayout name="custom">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
* {
  text-align: center;
  padding: 0;
  margin: 0;
}

body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #F4F4F4;
}

a {
  text-decoration: none;
}

button {
  background-color: #FFF000;
}

button:hover {
  background-color: #DDD000;
  cursor: pointer;
}
</style>
