<template>
    <section name="monthPicker">
      <div class="nav" ref="nav">
        <div class="year" @click="pickYear">
          <span>{{currentYear}}年</span>
          <span class="pullIcon" :class="{'pullIconUp': showYearPicker, 'pullIconDown': !showYearPicker}"></span>
        </div>
        <div class="month" ref="monthPicker">
          <ul ref="monthPickerScroll">
            <li class="whiteSpace" v-show="shadeToggle"></li>
            <li @click="changeMonth(item)" class="month-item" :class="{'active-month': currentMonth == item}" v-for="item in months" :ref="`month-${item}`" :key="`${currentYear}-${item}`">{{item}}月</li>
          </ul>
          <div class="shade" v-show="shadeToggle"></div>
        </div>
      </div>
      <mt-picker v-show="showYearPicker" :itemHeight="pickerItemHeight" class="yearPicker" :slots="yearPickerData" @change="changeYear" :style="{'top': pickerShadeTop + 'px'}" @click.stop></mt-picker>
      <div class="pickerShade" v-show="showYearPicker" @click="pickYear" :style="{'top': pickerShadeTop + 'px'}"></div>
    </section>
</template>

<script>
  import BScroll from 'better-scroll';
  import format from '@/tools/format';
    export default {
      name: 'month-picker',
      props: {
        minTime: { // 限制初始事件，优先级高于往前月参数
          type: String,
          default: ''
        },
        forwardTotalMonths: { // 时间选择最早时间为当前时间往前*月
          type: Number,
          default: 20
        },
        afterWardTotalMonths: { // 时间选择最晚时间为当前时间往后*月
          type: Number,
          default: 20
        }
      },
      data () {
        return {
          showYearPicker: false, // 年选择框显隐开关
          currentYear: 1990, // 初始化当前年
          currentMonth: 1, // 初始化当前月
          monthPickerScroll: '', // 月选择better-scroll变量
          monthConfig: {}, // 年对应月份数据配置，数据格式{'2018': [7, 8, 9]}，用以储存选择年后显示的月份
          months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // 初始化月数组
          years: [], // 初始化年数组
          pickerItemHeight: 30, // 年选择框每栏高度
          nowYearIndex: 0, // 默认点开年选择后选择的年份在年数组中对应的下标
          pickerShadeTop: 44, // 计算定位年选择弹框刚好在选择栏下方
          isFirstLoad: true, // 是否已经完成第一次加载页面，加载完成后赋值成false
          outputTimer: null, // 组件最终输出的时间数据变量
          yearPickerData: null, // 年选择弹框数据
          shadeToggle: true, // 月选择栏左侧小遮罩显影开关
          rePickTimeCtrl: '' // 时间选择频率控制变量
        };
      },
      methods: {
        timeOutput () { // 时间输出方法
          let currentTime = this.currentYear + (this.currentMonth > 9 ? '-' : '-0') + this.currentMonth;
          if (!this.isFirstLoad && !this.showYearPicker) {
            this.rePickTimeCtrl && (clearTimeout(this.rePickTimeCtrl));
            this.rePickTimeCtrl = setTimeout(() => {
              this.$emit('input', currentTime);
            }, 800);
          } else if (this.isFirstLoad) {
            this.isFirstLoad = false;
            this.$emit('input', currentTime);
          }
        },
        pickYear () { // 年选择框显影控制，关闭弹框输出时间
          this.showYearPicker = !this.showYearPicker;
          !this.showYearPicker && this.timeOutput();
        },
        changeYear (picker, value) { // 年切换方法
          this.currentYear = value[0];
          this.refreshMonthPickerScroll();
        },
        refreshMonthPickerScroll () { // 月滑动组件重加载方法
          if (!this.isFirstLoad) {
            this.months = this.monthConfig[this.currentYear];
            this.monthPickerScroll.refresh();
            this.isShadeToggle();
            this.changeMonth(this.months[0]);
          }
        },
        changeMonth (item) { // 点击选择月
          this.currentMonth = item;
          this.timeOutput();
          this.activeItem(item);
        },
        activeItem (item) { // 选择月自动左右滑动效果
          this.$nextTick(() => {
            let centerEl = this.$refs['month-' + item][0];
            this.monthPickerScroll.scrollToElement(centerEl, 300, true, 0);
          });
        },
        pickerInit () { // 时间选择器初始化
          let nowTime = format(new Date(), 'YYYY-MM'); // 项目应从服务器获取当前时间
          this.currentYear = parseInt(nowTime.split('-')[0]);
          this.currentMonth = parseInt(nowTime.split('-')[1]);
          this.pickerItemHeight = this.pickerItemHeight * ((document.documentElement.clientWidth) / 375);
          this.getTimeLimit();
          return Promise.resolve({
            year: this.currentYear,
            month: this.currentMonth
          });
        },
        isShadeToggle () { // 计算是否显示月份左侧小遮罩
          this.$nextTick(() => {
            let wrapperWidth = this.$refs.monthPicker.clientWidth;
            let scrollElWidth = this.$refs.monthPickerScroll.clientWidth;
            scrollElWidth > wrapperWidth ? (this.shadeToggle = true) : (this.shadeToggle = false);
          });
        },
        pageInit () { // 页面初始化方法
          this.pickerInit().then(() => {
            let nav = this.$refs.nav;
            this.pickerShadeTop = nav.offsetTop + nav.offsetHeight;
            this.monthPickerScroll = new BScroll(this.$refs.monthPicker, {
              scrollX: true,
              eventPassthrough: 'vertical' // 解决安卓点击时效问题
            });
            this.isShadeToggle();
            this.changeMonth(this.currentMonth);
            this.timeOutput();
          });
        },
        computeTimeLimit (forwardTotalMonths, afterwardTotalMonths) { // 计算时间可选择区域，参数1：往前月数，参数2：往后月数;同时将每年对应的月份存储
          let forwardMonths = forwardTotalMonths % 12; // 往前余月数
          let forwardYears = (forwardTotalMonths - forwardMonths) / 12; // 往前整年数
          let afterwardMonths = afterwardTotalMonths % 12; // 往后余月数
          let afterwardYears = (afterwardTotalMonths - afterwardMonths) / 12; // 往后整年数
          let difMonths = this.currentMonth - forwardMonths; // 当前月与往前余月数的差
          let sumMonths = this.currentMonth + afterwardMonths; // 当前月与往后余月数的差
          let minY = this.currentYear - forwardYears - (difMonths < 0 ? 1 : 0); // 存储最小年份
          let minM = difMonths + (difMonths < 0 ? 12 : 0); // 存储最小月份
          let maxY = this.currentYear + afterwardYears + (sumMonths > 12 ? 1 : 0); // 存储最大年份
          let maxM = sumMonths - (sumMonths > 12 ? 12 : 0); // 存储最大月份
          this.years = [];
          if (this.minTime) {
            let temArr = this.minTime.split('-');
            minY = temArr[0];
            minM = temArr[1];
          }
          for (let y = minY; y <= maxY; y++) {
            this.years.push(y);
            this.monthConfig[y] = [];
            let pushMonthMin = 1;
            let pushMonthMax = 12; // 默认月份为1到12月
            (y === minY) && (pushMonthMin = minM);
            (y === maxY) && (pushMonthMax = maxM); // 若为最小年份或最大年份，分别将月最小和月最大赋值
            for (let m = pushMonthMin; m <= pushMonthMax; m++) {
              this.monthConfig[y].push(m);
            }
          }
          this.months = this.monthConfig[this.currentYear];
        },
        getTimeLimit () { // 获取时间限制区域及初始化年选择数据
          this.computeTimeLimit(this.forwardTotalMonths, this.afterWardTotalMonths);
          this.nowYearIndex = this.years.indexOf(this.currentYear);
          this.yearPickerData = [{ // 初始化年选择组件数据
            flex: 1,
            defaultIndex: this.nowYearIndex,
            values: this.years
          }];
        }
      },
      components: {},
      created () {},
      mounted () {
        this.$nextTick(() => {
          this.pageInit();
        });
      }
    };
</script>

<style lang='less' scoped>
    [name="monthPicker"]{
      .nav{
        background: #597ED9;
        height: 2.2rem;
        line-height: 2.2rem;
        color: #333;
        font-size: .65rem;
        text-align: center;
        display: flex;
        .year{
          width: 25%;
          .pullIcon{
            display: inline-block;
            width: .4rem;
            height: .4rem;
            border-right: 2px solid #333;
            border-bottom: 2px solid #333;
            margin-left: .3rem;
            position: relative;
          }
          .pullIconUp{
            transform: rotate(-135deg);
            top: .1rem;
          }
          .pullIconDown{
            transform: rotate(45deg);
            top: -.1rem;
          }
        }
        .month{
          flex: 1;
          position: relative;
          overflow: hidden;
          height: 2.2rem;
          .shade{
            position: absolute;
            left: -.1rem;
            top: 0;
            width: 1.4rem;
            height: 2.2rem;
            background-image: linear-gradient(-90deg, rgba(94, 132, 229, 0) 0%, #597ED9 100%);
          }
          ul{
            position: absolute;
            height: 100%;
            min-width: 100%;
            display: flex;
            flex-wrap: nowrap;
            white-space: nowrap;
            justify-content: center;
            align-items: center;
            .whiteSpace{
              width: 1.4rem;
            }
            .month-item{
              padding: 0 .6rem;
              flex: 0 0 2.2rem;
              text-align: center;
              position: relative;
            }
            .active-month{
              &:after{
                content: '';
                width: 1rem;
                height: 2px;
                background: #333;
                display: block;
                position: relative;
                bottom: .45rem;
                margin: 0 auto;
              }
            }
          }
        }
      }
      .yearPicker{
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 99;
        .picker-center-highlight{
          &:before, &:after{
            height: 2px;
          }
        }
      }
      .pickerShade{
        opacity: .5;
        background: #000;
        position: absolute;
        left: 0;right: 0;
        bottom: 0;
        z-index: 98;
      }
    }
</style>
