<template>
  <div class="firstPage" @click="jumpHome">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'unfind',
  data () {
    return {
      msg: '迷失页'
    };
  },
  methods: {
    jumpHome () {
      this.$router.push({'path': '/'});
    }
  }
};
</script>
<style scoped>
</style>
