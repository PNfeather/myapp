<template>
    <app-page id="test-dom">
        <app-header :title="title"></app-header>
      <div ref="chart" class="chart"></div>
    </app-page>
</template>

<script>
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/pie'); // echarts局部引入方法
  require('echarts/lib/chart/bar'); //  echarts局部引入方法
  require('echarts/lib/component/tooltip'); // 不引入无法显示文本提示框
    export default {
      name: 'test-dom',
      data () {
        return {
          title: 'testDom',
          pageChart: null
        };
      },
      methods: {
        test () { // 测试重复调接口会拦截
          this.$http.get('/test').then((res) => {
            console.log(res);
          });
          this.$http.get('/test', {
            data: {
              test: 0
            }
          }).then((res) => {
            console.log(res);
          });
        },
        getChartOption () {
          let option = {
            color: ['red'],
            tooltip: {
              trigger: 'item',
              formatter: (data) => {
                return data.name + '<br/>' + data.seriesName + '：' + data.value; // 将小数转化为百分数显示
              },
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true // 将刻度数据计算在图表内
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
              }
            ]
          };
          // let option = {
          //   title: {
          //     text: '新老顾客比例',
          //     subtext: '',
          //     x: 'center'
          //   },
          //   tooltip: {
          //     trigger: 'item',
          //     formatter: '{a} <br/>{b} : {c} ({d}%)'
          //   },
          //   legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //     data: ['新顾客', '老顾客']
          //   },
          //   toolbox: {
          //     show: true,
          //     feature: {
          //       mark: {
          //         show: true
          //       },
          //       dataView: {
          //         show: true,
          //         readOnly: true
          //       },
          //       magicType: {
          //         show: true,
          //         type: ['pie', 'funnel'],
          //         option: {
          //           funnel: {
          //             x: '25%',
          //             width: '50%',
          //             funnelAlign: 'left',
          //             max: 1548
          //           }
          //         }
          //       },
          //       restore: {
          //         show: true
          //       },
          //       saveAsImage: {
          //         show: true
          //       }
          //     }
          //   },
          //   calculable: true,
          //   series: [
          //     {
          //       name: '访问来源',
          //       type: 'pie',
          //       radius: '55%',
          //       center: ['50%', '60%'],
          //       data: [
          //         {
          //           value: 205,
          //           name: '新顾客'
          //         },
          //         {
          //           value: 610,
          //           name: '老顾客'
          //         }
          //       ],
          //       itemStyle: {
          //         normal: {
          //           color: function (params) {
          //             // build a color map as your need.
          //             var colorList = ['#22DDDD', '#F0805A'];
          //             return colorList[params.dataIndex];
          //           }
          //         },
          //         emphasis: {
          //           shadowBlur: 10,
          //           shadowOffsetX: 0,
          //           shadowColor: 'rgba(0, 0, 0, 0.5)'
          //         }
          //       }
          //     }
          //   ]
          // };
          return option;
        }
      },
      components: {},
      created () {
        this.test();
      },
      mounted () {
        this.$nextTick(() => {
          this.pageChart = echarts.init(this.$refs.chart);
          this.pageChart.setOption(this.getChartOption());
        });
      }
    };
</script>

<style lang='less' scoped>
    #test-dom{
      .chart{
        height: 18rem;
        width: 100%;
        position: relative;
      }
    }
</style>
