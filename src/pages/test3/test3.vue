<template>
  <div class="firstPage" @click="jumpHome">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'test3',
  data () {
    return {
      msg: 'test3Page'
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
