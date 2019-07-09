<template>
  <div name='com1'>
    <div @click="add">{{count}}</div>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'com1',
    data () {
      return {
        count: 1
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {
      add () {
        this.count++;
        this.$EVENTBUS.$emit('change-count', this.count);
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  [name = 'com1']{}
</style>
