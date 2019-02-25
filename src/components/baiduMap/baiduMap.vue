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
        this.setMapEvent(); // 设置地图事件
        this.mapControlDeal('addControl'); // 向地图添加控件
      },
      createMap () {
        this.map = new BMap.Map('baidu-map', {minZoom: 5, maxZoom: 18});
        this.map.centerAndZoom(new BMap.Point(114.02597366, 22.54605355), 14);
        this.$nextTick(() => {
          this.getNowLocation();
        });
      },
      getNowLocation () {
        /* eslint-disable */

        let geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition((r) => {
          if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
            let mk = new BMap.Marker(r.point);
            this.map.addOverlay(mk);
            this.map.panTo(r.point);
            console.log('当前位置经度为:' + r.point.lng + '纬度为:' + r.point.lat);
            this.setLocation(r.point);
            return Promise.resolve(r.point);
          } else {
            console.log('无法定位到您的当前位置，导航失败，请手动输入您的当前位置！' + this.getStatus());
            return Promise.resolve(false);
          }
        }, {enableHighAccuracy: true});
      },
      setLocation (point) { // 根据坐标获取地理位置名称
        let geoc = new BMap.Geocoder();
        geoc.getLocation(point, function (rs) {
          let addComp = rs.addressComponents;
          let result = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
          console.log('当前的位置为:' + result);
        });
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
        let top_right_navigation = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        }); //右上角，仅包含平移和缩放按钮

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
