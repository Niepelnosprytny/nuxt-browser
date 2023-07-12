<template>
  <div>
    <NuxtLayout name="custom">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
body {
  text-align: center;
  background-color: #F4F4F4;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
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

input[type="number"],
input[type="text"],
input[type="search"] {
  text-indent: 1rem;
}

select,
input,
button {
  border: 0.1rem solid black;
  font-size: 1rem;
}

select,
input {
  background-color: #F4F4F4;
}

select:focus,
input:focus {
  border: 0.15rem solid black;
}

select:hover,
input:hover,
button:hover {
  border: 0.15rem solid #666666;
}
</style>
