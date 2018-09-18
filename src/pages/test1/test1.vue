<template>
  <div class="firstPage" @click="jumpHome">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'test1',
  data () {
    return {
      msg: 'test1Page'
    }
  },
  methods: {
    jumpHome () {
      this.$router.push({'path': '/'})
    }
  }
}
</script>
<style scoped>
</style>
