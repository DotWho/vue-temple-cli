<template>
  <div>
    {{ 30000|fmtMoney }}
    {{ 30000|fmtMoney(1) }}
    {{ 30000|fmtMoney(2) }}
    <br />
    {{ 30000.01|fmtMoney }}
    {{ 30000.22|fmtMoney(0) }}
    {{ 30000.300|fmtMoney(3) }}
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
