<template>
    <section name="baidu-map" id="baidu-map">
    </section>
</template>

<script>
  import BMap from 'BMap';
  export default {
    name: 'mymap',
    data () {
      return {
        map: ''
      };
    },
    mounted () {
      // 创建和初始化地图函数：
      this.initMap();
    },
    methods: {
      // 创建和初始化地图函数：
      initMap () {
        this.createMap();// 创建地图
        this.setMapEvent();// 设置地图事件
        this.mapControlDeal('addControl');// 向地图添加控件
      },
      createMap () {
        this.map = new BMap.Map('baidu-map', {minZoom: 8, maxZoom: 14});
        this.map.centerAndZoom(new BMap.Point(116.4035, 39.915), 11);
      },
      moveMap () { // 两秒后移动到广州
        setTimeout(() => {
          this.map.panTo(new BMap.Point(113.262232, 23.154345));
        }, 2000);
      },
      setMapEvent () {
        this.$nextTick(() => {
          this.map.enableScrollWheelZoom(true); // 目前无效原因待查
          this.map.disableDragging(); // 禁止拖拽
          setTimeout(() => {
            this.map.enableDragging(); // 两秒后开启拖拽
          }, 4000);
        });
      },
      mapControlDeal (method) { // 控件处理方法，参数：'addControl'添加，'removeControl'移除
        /* eslint-disable */

        let top_left_navigation = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}); //左上角，添加默认缩放平移控件

        /*缩放控件type有四种类型:
          BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
        let top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

        this.map[method](top_left_navigation);
        this.map[method](top_right_navigation);
      }
    }
  };
</script>

<style lang='less' scoped>
    [name="baidu-map"]{
      width: 100%;
      height: 100%;
    }
</style>
