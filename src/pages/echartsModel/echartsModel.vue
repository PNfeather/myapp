<template>
    <app-page id='echarts-model'>
        <app-header :title='title'></app-header>
        <section class="mainContent">
          <month-picker v-model="pickerTime" :forwardTotalMonths="12" :afterWardTotalMonths="6"></month-picker>
          <my-echarts :pickerTime="pickerTime"></my-echarts>
        </section>
    </app-page>
</template>

<script>
  import monthPicker from '@/components/monthPicker/monthPicker';
  import myEcharts from './components/echarts';
  export default {
    name: 'hello',
    data () {
      return {
        title: '表单示例页',
        pickerTime: ''
      };
    },
    components: {
      monthPicker,
      myEcharts
    },
    mounted () {
    },
    watch: {
      pickerTime (val) {
        console.log('当前选择时间' + val);
      }
    },
    methods: {
    }
  };
</script>

<style lang='less' scoped>
    #echarts-model{
      .mainContent{
        min-height: 100%;
        .echartsTest{
          width: 100%;
          height: 20rem;
        }
      }
    }
</style>
