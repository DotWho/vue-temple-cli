<template>
  <div class="home">
    <h1>img src</h1>
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <h1>img background</h1>
    <div class="img">&nbsp;</div>
  </div>
</template>

<style lang="scss">
.home {
  .img {
    width: 200px;
    height: 200px;
    background: url(setImg('logo.png')) no-repeat center;
  }
}
</style>
