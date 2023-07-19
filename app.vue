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
}

html, body {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #262626;
}

h1, h2, h3, h4, h5, h6, strong {
  font-weight: 700;
}

a {
  text-decoration: none;
}

button {
  background-color: #F00000;
  color: #F4F4F4;
  font-weight: 700;
}

button:hover,
button:active {
  background-color: #FF3333;
  cursor: pointer;
}

select,
input,
button {
  border-radius: 0.35rem;
  border: 0.15rem solid #060606;
}

select,
input {
  background-color: #F4F4F4;
}

select:focus,
input:focus {
  outline: 0.1rem solid #F4F4F4;
}
</style>
