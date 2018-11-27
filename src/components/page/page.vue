<template>
  <div class="app-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'app-page',
  data () {
    return {
    };
  },
  methods: {},
  components: {},
  created () {},
  mounted () {}
};
</script>

<style lang='less' scoped>
  .app-page{
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0;
    margin-top: 2.25rem;
    background-color: #f0f0f0;
  }
</style>
