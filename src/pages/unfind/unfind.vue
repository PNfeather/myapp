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
      msg: '来到了火星，点击返回首页'
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
