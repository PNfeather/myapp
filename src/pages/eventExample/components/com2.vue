<template>
  <div name='com2'>
    <div>
      {{count}}
    </div>
  </div>
</template>

<script type='text/babel'>
  export default {
    name: 'com2',
    data () {
      return {
        count: 1
      };
    },
    created () {},
    mounted () {
      this.$EVENTBUS.$on('change-count', (val) => {
        this.changeCount(val);
      });
    },
    computed: {},
    watch: {},
    methods: {
      changeCount (val) {
        this.count = val;
      }
    },
    components: {}
  };
</script>
<style scoped lang="less">
  [name = 'com2']{}
</style>
