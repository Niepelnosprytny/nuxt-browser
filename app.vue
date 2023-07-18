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
  box-sizing: border-box;
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
  background-color: #F60000;
  color: #F4F4F4;
}

button:hover {
  background-color: #FF4444;
  cursor: pointer;
}

select,
input,
button {
  border: 0;
}

select,
input {
  background-color: #F4F4F4;
}
</style>
