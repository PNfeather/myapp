<template>
    <app-page name="map-model">
      <app-header :title="title"></app-header>
      <baidu-map></baidu-map>
    </app-page>
</template>

<script>
  import baiduMap from '@/components/baiduMap/baiduMap';
    export default {
      name: 'map-model',
      data () {
        return {
            title: '地图引入示例页'
        };
      },
      methods: {},
      components: {
        baiduMap
      },
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    [name="map-model"]{

    }
</style>
