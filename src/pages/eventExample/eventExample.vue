<template>
  <div name='eventExample'>
    <com1></com1>
    <com2></com2>
  </div>
</template>

<script type='text/babel'>
  import com1 from './components/com1';
  import com2 from './components/com2';
  export default {
    name: 'eventExample',
    data () {
      return {
      };
    },
    created () {},
    mounted () {},
    computed: {},
    watch: {},
    methods: {},
    components: {
      com1,
      com2
    }
  };
</script>
<style scoped lang="less">
  [name = 'eventExample']{}
</style>
