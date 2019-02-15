<template>
    <app-page id="scroll-model">
        <app-header :title="title"></app-header>
      <scroll class="scrollContent" :loading="loading" :reloading="reloading" :noMore="noMore" :data="dataList" @scrollToEnd="getData" @pulldown="resetPage">
        <div class="item" v-for="(item, index) in dataList" :key="index">
          <div class="program">
            <span class="subTitle">姓名</span> ：
            <span class="val">{{item.name}}</span>
          </div>
          <div class="program">
            <span class="subTitle">证件号</span> ：
            <span class="val">{{item.id}}</span>
          </div>
          <div class="program">
            <span class="subTitle">邮件</span> ：
            <span class="val">{{item.email}}</span>
          </div>
        </div>
      </scroll>
    </app-page>
</template>

<script>
  import scroll from '@/components/scroll/scroll.vue';
    export default {
      name: 'scroll-model',
      data () {
        return {
          title: '模拟分页加载页',
          loading: false,
          noMore: false,
          reloading: false,
          dataList: [],
          pageNum: 1,
          pageSize: 6
        };
      },
      methods: {
        getData () {
          if (this.noMore) return;
          this.loading = true;
          this.$http.get('/scrollTest', {
            data: {
              pageNum: this.pageNum,
              pageSize: this.pageSize
            }
          }).then((res) => {
            let data = res.data;
            this.reloading && (this.reloading = false);
            if (data.resultCode === '000000') {
              this.dataList.push(...data.resultData);
              this.pageNum++;
              (data.resultData.length < this.pageSize) && (this.noMore = true);
              this.loading = false;
            } else {
              this.loading = false;
              this.$toast(data.resultMsg || '网络异常');
            }
          });
        },
        resetPage () {
          this.reloading = true;
          this.dataList = [];
          this.loading = false;
          this.noMore = false;
          this.pageNum = 1;
        }
      },
      components: {
        scroll
      },
      created () {
        this.getData();
      },
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #scroll-model{
      .scrollContent{
        position: absolute;
        top: 0;right: 0;left: 0;bottom: 0;
        .item{
          &:first-child{
            border: none!important;
          }
          padding: .2rem .8rem;
          border-top: 1px solid #f1f1f1;
          background-color: #fff;
          .program{
            display: flex;
            line-height: 1.8rem;
            .subTitle{
              height: 1.8rem;
              width: 4rem;
              display: inline-block;
              text-align: justify;
              &:after{
                content: '';
                display: inline-block;
                width: 100%;
                height: 0;
              }
            }
            .val{
              flex: 1;
              text-align: center;
            }
          }
        }
      }
    }
</style>
