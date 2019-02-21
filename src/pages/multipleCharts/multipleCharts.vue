<template>
    <app-page name="multiple-charts">
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">
          <tabs v-model="activeKey" class="wrapper">
            <pane :label="item.label" :name="item.name" v-for="item in chartList" :key="item.name" class="chart" :id="`chart-${item.name}`">
            </pane>
          </tabs>
        </app-main>
    </app-page>
</template>

<script>
  import tabs from '@/components/clickTabs/tabs.vue';
  import pane from '@/components/clickTabs/pane.vue';
  import { config } from './data';
  import { getOption } from './options';
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入各类图组件
  require('echarts/lib/chart/line');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');
  require('echarts/lib/chart/scatter');
  require('echarts/lib/chart/candlestick');
  require('echarts/lib/chart/radar');
  require('echarts/lib/chart/graph');
  require('echarts/lib/chart/tree');
  require('echarts/lib/chart/treemap');
  require('echarts/lib/chart/sunburst');
  require('echarts/lib/chart/parallel');
  require('echarts/lib/chart/funnel');
  require('echarts/lib/chart/themeRiver');
  require('echarts/lib/chart/heatmap');
  require('echarts/lib/chart/effectScatter');
  // 引入日历坐标系
  require('echarts/lib/component/calendar');
  // 引入提示框、标题及说明
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');
    export default {
      name: 'multiple-charts',
      data () {
        return {
          title: '图表展示页',
          chartList: [...config],
          activeKey: 1,
          scrollObj: '',
          pageChart: null,
          isFirstLoad: true
        };
      },
      methods: {
        getOption (type) {
          return getOption(echarts)[type];
        },
        initChart () {
          let item = this.chartList[this.activeKey - 1];
          this.pageChart = echarts.init(document.getElementById('chart-' + item.name));
          this.pageChart.setOption(this.getOption(item.type));
        },
        reloadChart () {
          this.pageChart.clear();
          this.initChart();
        }
      },
      components: {
        tabs,
        pane
      },
      created () {},
      mounted () {
        this.$nextTick(() => {
          this.initChart(this.chartList[0]);
          this.isFirstLoad = false;
          this.$nextTick(() => {
            this.activeKey = 14;
          });
        });
      },
      watch: {
        activeKey () {
          this.$nextTick(() => {
            !this.isFirstLoad && this.reloadChart();
          });
        }
      }
    };
</script>

<style lang='less' scoped>
    [name="multiple-charts"]{
      .chart{
        width: 100%;
        height: 18rem;
        >div{
          width: 100%;
        }
      }
    }
</style>
