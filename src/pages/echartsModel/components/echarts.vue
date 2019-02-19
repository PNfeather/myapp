<template>
    <section name="echarts">
      <div class="tips" ref="tips" v-show="tipsToggle">
        <div class="dataExplain">
          <span>{{currentData.value}}</span>
          <span class="time">{{currentData.time}}</span>
        </div>
      </div>
      <div class="axleLines" v-for="(item, index) in dataStore[pickerTime]" :key="`${pickerTime}-line${index}`" v-show="index != activeBar" :style="{'left': item.centerPointX + 'px'}"></div>
      <div class="line" ref="line" v-show="tipsToggle"></div>
      <div ref="barCharts" class="barCharts" @touchstart="changeBars($event)" @touchmove="changeBars($event)"></div>
    </section>
</template>

<script>
  import {getCss} from '@/tools/common';
  let echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar'); // echarts局部引入方法
  let htmlFontSize = 20 * (document.documentElement.clientWidth / 375);
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
          pageChart: null, // 图表变量
          tipsToggle: false, // 说明框显影开关
          onlineData: null, // 存储后端返回数据
          changeBarsToggle: true, // 表柱切换时间间隔控制器
          chartLeft: 2.8 * htmlFontSize, // 图表距离左边距离
          chartBottom: 2 * htmlFontSize, // 图表距离底部距离
          chartWidth: 14 * htmlFontSize, // 图表宽度
          chartHeight: 6 * htmlFontSize, // 图表高度
          activeBar: -1, // 当前选中表柱
          currentData: {
            value: '', // 提示文本框数据值
            time: '' // 提示文本框时间
          },
          dataStore: {}, // 数据缓存变量
          firstLoaded: false // 页面是否完成第一次加载
        };
      },
      methods: {
        getChartData () { // 获取数据方法
          let param = {
            url: '/echartTest',
            data: {
              time: this.pickerTime
            }
          };
          if (this.dataStore[this.pickerTime]) {
            return Promise.resolve(this.dataStore[this.pickerTime]);
          } else {
            return this.$http.get(param.url, {data: param.data}).then((res) => {
              let data = res.data;
              if (data.resultCode === '000000') {
                this.computeBarsSplit(data.resultData);
                this.dataStore[this.pickerTime] = data.resultData;
                return Promise.resolve(data.resultData);
              } else {
                return Promise.resolve(false);
              }
            });
          }
        },
        getChartOption (xData, yData) { // 获取图表配置信息
          let xAxisData = xData || [];
          let yAxisData = yData || [];
          let YsplitNum = 4; // y轴段数
          let Ymax = this.standard(yAxisData, YsplitNum);
          let Ystep = Ymax / YsplitNum;
          let option = {
            grid: {
              left: this.chartLeft,
              bottom: this.chartBottom,
              width: this.chartWidth,
              height: this.chartHeight
            },
            xAxis: {
              data: xAxisData,
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#666',
                  fontSize: 0.55 * htmlFontSize
                },
                interval: xAxisData.length - 2 // x轴刻度间隔
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#E5E5E5'
                }
              }
            },
            yAxis: {
              splitLine: false,
              max: Ymax,
              interVal: Ystep, // y轴刻度间隔
              splitNumber: YsplitNum,
              axisTick: {
                show: false
              },
              axisLine: { // 轴线
                show: true,
                lineStyle: {
                  color: '#E5E5E5'
                }
              },
              axisLabel: { // 刻度
                textStyle: {
                  color: '#666',
                  fontSize: 0.65 * htmlFontSize
                }
              }
            },
            series: [
              {
                type: 'bar', // 柱状图
                data: yAxisData,
                color: 'aqua',
                itemStyle: {
                  normal: {
                    barBorderRadius: [100, 100, 0, 0] // 柱状图圆角
                  }
                },
                barWidth: 0.2 * htmlFontSize,
                barCategoryGap: `0.3 * ${htmlFontSize}px`
              }
            ]
          };
          return option;
        },
        standard (data, cornumber) { // data数组，cornumber分割数，以此计算出一个最合理的轴线最大值
          let cormax = this.getDataMax(data);
          if (cormax < cornumber) return cornumber;
          let corstep, temstep, tempnumber, temp, extranumber;
          corstep = (cormax - 0) / cornumber;
          if (Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) == corstep) {
            temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)));
          } else {
            temp = Math.pow(10, (parseInt(Math.log(corstep) / Math.log(10)) + 1));
          }
          temstep = (corstep / temp).toFixed(6);
          // 选取规范步长
          if (temstep >= 0 && temstep <= 0.1) {
            temstep = 0.1;
          } else if (temstep >= 0.100001 && temstep <= 0.2) {
            temstep = 0.2;
          } else if (temstep >= 0.200001 && temstep <= 0.25) {
            temstep = 0.25;
          } else if (temstep >= 0.250001 && temstep <= 0.5) {
            temstep = 0.5;
          } else {
            temstep = 1;
          }
          temstep = Math.ceil(temstep * temp);
          cormax = Math.ceil(cormax / temstep) * temstep;
          tempnumber = (cormax - 0) / temstep;
          if (tempnumber < cornumber) {
            extranumber = cornumber - tempnumber;
            if (extranumber % 2 == 0) {
              cormax = cormax + temstep * parseInt(extranumber / 2);
            } else {
              cormax = cormax + temstep * parseInt(extranumber / 2 + 1);
            }
          }
          return cormax;
        },
        getDataMax (data) { // 获取data中最大数
          if (!Array.isArray(data)) return false;
          if (data.length === 0) return 0;
          let dataMax = 0;
          data.forEach((item) => {
            if (item > dataMax) dataMax = Math.ceil(item);
          });
          return dataMax;
        },
        getCurrentData (barIndex) { // 获取说明框信息
          let month = parseInt(this.pickerTime.split('-')[1]);
          this.currentData = Object.assign(this.currentData, this.onlineData[barIndex]);
          this.currentData.time = '(' + month + '月' + this.onlineData[barIndex].day + '日)';
          this.currentData.value = this.onlineData[barIndex].val;
        },
        computeBarsSplit (data) { // 计算每个柱所占X轴区域及中心点
          let dataLen = data.length;
          let step = this.chartWidth / dataLen;
          for (let i = 0; i < dataLen; i++) {
            data[i].limitMin = this.chartLeft + step * i;
            data[i].limitMax = this.chartLeft + step * (i + 1);
            data[i].centerPointX = this.chartLeft + step * i + step / 2;
            (i === 0) && (data[i].limitMin = 0);
            (i === dataLen - 1) && (data[i].limitMax = document.documentElement.clientWidth);
          }
        },
        showTips (barIndex) { // 显示文案框方法，参数为字符串'default'时显示默认信息
          this.getCurrentData(barIndex);
          let lineDiv = this.$refs.line;
          let tipsDiv = this.$refs.tips;
          let divWidth = parseInt(getCss(tipsDiv, 'width'));
          let domWidth = document.documentElement.clientWidth;
          let offsetX = this.onlineData[barIndex].centerPointX;
          lineDiv.style.left = offsetX + 'px'; // 使指针在点击位置上方
          tipsDiv.style.transform = 'translateX(0)';
          if (offsetX + divWidth / 2 > domWidth) {
            tipsDiv.style.left = (domWidth - divWidth) + 'px';
          } else if (offsetX - divWidth / 2 < 0) {
            tipsDiv.style.left = 0;
          } else {
            tipsDiv.style.left = offsetX - divWidth / 2 + 'px';
          }
          this.$nextTick(() => {
            this.tipsToggle = true;
          });
        },
        getXYData (data) { // 从数组中重组出XY轴数据
          let dataX = [];
          let dataY = [];
          data.forEach((item) => {
            dataX.push(item.day);
            dataY.push(item.val);
          });
          return [dataX, dataY];
        },
        initChart () { // 初始化图表
          this.getChartData().then((res) => {
            if (res) {
              this.onlineData = res;
              this.pageChart = echarts.init(this.$refs.barCharts);
              this.pageChart.setOption(this.getChartOption(...this.getXYData(res)));
              this.activeBar = res.length - 1;
              this.showTips(this.activeBar);
            }
          });
        },
        changeBars (e) { // 改变柱方法
          if (this.changeBarsToggle) {
            this.changeBarsToggle = false;
            let touchX = e.touches[0].pageX;
            this.onlineData.forEach((item, index) => {
              if (touchX > item.limitMin && touchX <= item.limitMax) {
                this.activeBar = index;
                this.showTips(this.activeBar);
              }
            });
            setTimeout(() => {
              this.changeBarsToggle = true;
            }, 30);
          }
        },
        reloadChart () { // 图表重加载方法
          this.tipsToggle = false;
          this.pageChart.clear();
          this.initChart();
        }
      },
      components: {},
      created () {},
      mounted () {},
      watch: {
        pickerTime (val) {
          this.$nextTick(() => {
            if (this.firstLoaded) {
              this.reloadChart();
            } else {
              this.firstLoaded = true;
              this.initChart();
            }
          });
        },
        activeBar (val) {
          this.$nextTick(() => {
            this.showTips(val);
          });
        }
      }
    };
</script>

<style lang='less' scoped>
    [name="echarts"]{
      width: 100%;
      overflow: hidden;
      position: relative;
      background: #fff;
      margin-bottom: .5rem;
      .tips{
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 8rem;
        height: 3rem;
        .dataExplain{
          height: .9rem;
          line-height: .9rem;
          font-size: .6rem;
          color: #999;
          .time{
            margin-left: .4rem;
          }
        }
      }
      .axleLines{
        background: #f1f1f1;
        width: 1px;
        height: 6rem;
        position: absolute;
        bottom: 2rem;
      }
      .line{
        width: .3rem;
        height: .3rem;
        transform: translateX(-.15rem);
        border-radius: 1rem;
        background: #FFA300;
        position: absolute;
        bottom: 8.7rem;
        &:after{
          content: '';
          height: 6.7rem;
          width: 1px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -6.7rem;
          background: #FFA300;
        }
      }
      .barCharts {
        width: 100%;
        height: 13rem;
      }
    }
</style>
