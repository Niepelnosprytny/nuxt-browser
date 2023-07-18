<template>
  <div>
    <NuxtLayout name="custom">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  text-align: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
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
  background-color: #F00000;
  color: #F4F4F4;
  font-weight: bold;
}

button:hover {
  background-color: #FF3333;
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
