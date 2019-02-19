<template>
    <section name="echarts"></section>
</template>

<script>
    export default {
      name: 'echarts',
      props: {
        pickerTime: {
          type: String,
          default: ''
        }
      },
      data () {
        return {
        };
      },
      methods: {},
      components: {},
      created () {},
      mounted () {},
      watch: {
        pickerTime (val) {
          console.log(val);
        }
      }
    };
</script>

<style lang='less' scoped>
    [name="echarts"]{

    }
</style>
