<template>
  <div>
    <tabs v-model="activeKey">
      <pane label="标签1" name="1">
        标签一的内容
        <span @click.stop="openShowMore">这是:</span>
        <div v-show="showMore" v-clickOutside="hideShowMore">隐藏内容</div>
      </pane>
      <pane label="标签2" name="2">
        标签二的内容
        <p v-time="timeNow"></p>
        <p v-time="timeBefore"></p>
      </pane>
      <pane label="标签3" name="3">
        标签三的内容
        <span @click="jumpHome">去test2</span>
      </pane>
    </tabs>
  </div>
</template>

<script>
import tabs from '@/components/tabs/tabs.vue';
import pane from '@/components/tabs/pane.vue';
import {commonTime} from '@/tools/common';
export default {
  name: 'test1',
  data () {
    return {
      activeKey: '1',
      showMore: false,
      timeNow: new Date().getTime(),
      timeBefore: 1538215500925
    };
  },
  directives: {
    time: {
      bind: function (el, binding) {
        el.innerHTML = commonTime.getFormatTime(binding.value);
        el.__timeout__ = setInterval(() => {
          el.innerHTML = commonTime.getFormatTime(binding.value);
        }, 60000);
      },
      unbind: function (el) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
      }
    }
  },
  created () {
  },
  components: {
    tabs,
    pane
  },
  methods: {
    jumpHome () {
      this.$router.push({'path': '/test2'});
    },
    openShowMore () {
      this.showMore = !this.showMore;
    },
    hideShowMore () {
      this.showMore = false;
    }
  }
};
</script>
<style scoped>
</style>
