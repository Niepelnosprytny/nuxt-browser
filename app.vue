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
  background-color: #FFF000;
}

button:hover {
  background-color: #DDD000;
  cursor: pointer;
}

select,
input,
button {
  border: 0.1rem solid black;
}

select,
input {
  background-color: #F4F4F4;
}

select:hover,
input:hover,
button:hover {
  border: 0.1rem solid #666666;
}

select:focus,
input:focus {
  border: 0.15rem solid black;
}
</style>
