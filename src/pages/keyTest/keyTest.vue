<template>
  <div id="keyTest">
    <div class="tabs">
      <div class="item" @click="changeList(1)">列表1</div>
      <div class="item" @click="changeList(2)">列表2</div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="item">
      </div>
    </div>
  </div>
</template>

<script>
import image1 from '@/assets/image/1.png';
import image2 from '@/assets/image/2.jpg';
import image3 from '@/assets/image/3.jpg';
import image4 from '@/assets/image/4.jpeg';
import image6 from '@/assets/image/6.jpg';
import image7 from '@/assets/image/7.jpg';
import image8 from '@/assets/image/8.jpg';
import image9 from '@/assets/image/9.jpg';

export default {
  name: 'key-test',
  data() {
    return {
      list: [],
      list1: [image1, image2, image3, image4],
      list2: [image6, image7, image8, image9]
    };
  },
  methods: {
    changeList(type) {
      const currentList = this[`list${type}`];
      this.list = currentList;
      // this.list.splice(0, this.list.length, ...currentList);
    }
  },
  mounted() {
    this.changeList(1);
  }
};
</script>

<style lang='less' scoped>
.tabs {
  width: 100%;
  height: 40px;
  background: #fff;
  display: flex;

  .item {
    box-sizing: border-box;
    border: 1px solid #f0f0f0;
    flex: 1;
    height: 100%;
    line-height: 38px;
    text-align: center;
  }
}

.list {
  overflow: auto;

  .item {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
