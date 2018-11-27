<template>
  <main class="main" ref="main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'app-main',
  props: {
    key: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    };
  },
  methods: {

  },
  components: {},
  created () {},
  mounted () {
    this.$nextTick(() => {

    });
  }
};
</script>

<style lang='less' scoped>
  .main{
    position: absolute;
    top: 0;right: 0;
    bottom: 0;left: 0;
    overflow: hidden;
  }
</style>
