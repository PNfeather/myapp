<template>
  <div class="page">
    <mt-header class="header" :title="`页面3`"></mt-header>
    <div class="content" id="scrollTabsElement">
      <div class="big" @click="changeHeight" id="beforeContent">前置内容</div>
      <tabs v-model="activeKey" :changeType="`scroll`" ref="tabsElement">
        <pane label="入门" name="1">
          <div class="con" ref="content1">内容1</div>
        </pane>
        <pane label="日常" name="2">
          <div class="con">内容2</div>
        </pane>
        <pane label="月度" name="3">
          <div class="con">内容3</div>
        </pane>
        <pane label="年度" name="4">
          <div class="con">内容4
            <span @click="jumpHome">回首页</span>
          </div>
        </pane>
      </tabs>
      <div class="big" style="height: 10rem" v-show="true">后置内容</div>
    </div>
  </div>
</template>

<script>
import tabs from '@/components/tabs/tabs.vue';
import pane from '@/components/tabs/pane.vue';
export default {
  name: 'test3',
  data () {
    return {
      activeKey: '1',
      msg: 'test3Page'
    };
  },
  components: {
    tabs,
    pane
  },
  mounted () {
    setTimeout(() => {
      document.getElementById('beforeContent').style.height = 300 + 'px';
    }, 2000);
  },
  methods: {
    jumpHome () {
      this.$router.push({'path': '/'});
    },
    changeHeight () {
      this.$refs.content1.style.height = 300 + 'px';
    }
  }
};
</script>
<style lang="less" scoped>
  .page{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin-top: 2.25rem;
    .header{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: -2.25rem;
    }
    .content{
      .big{
        height: 40rem;
        background: #fff;
      }
      .con{
        height: 10rem;
        background: #fff;
      }
    }
  }
</style>
