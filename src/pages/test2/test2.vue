<template>
  <div class="firstPage" @click="jumpHome">
    <mt-header :title="`你好`"></mt-header>
    <p>{{ msg }}</p>
    <p v-text="getSum()"></p>
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
    },
    getSum () {
      return this.$store.getters.sumState(2);
    }
  }
};
</script>
<style scoped>
</style>
