<template>
  <div class="firstPage" @click="jumpHome">
    <mt-header :title="`你好`"></mt-header>
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'test2',
  data () {
    return {
      msg: 'test2Page'
    };
  },
  methods: {
    jumpHome () {
      this.$router.push({'path': '/test3'});
    }
  }
};
</script>
<style scoped>
</style>
