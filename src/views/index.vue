<template>
  <div>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    />
    <div class="home">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
.home {
  width: 200px;
  height: 200px;
  background: url(setImg('logo.png')) no-repeat;
}
</style>
