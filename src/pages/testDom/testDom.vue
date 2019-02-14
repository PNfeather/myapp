<template>
    <app-page id="test-dom">
        <app-header :title="title"></app-header>
      <paging-upload class="scrollContent" :loading="loading" :noMore="noMore">
        <div class="div" :key="item" v-for="item in [1, 2, 3, 4]">{{'内容' + item}}</div>
      </paging-upload>
    </app-page>
</template>

<script>
  import pagingUpload from '@/components/pagingUpload/pagingUpload.vue';
    export default {
      name: 'test-dom',
      data () {
        return {
          title: 'testDom',
          loading: false,
          noMore: false
        };
      },
      methods: {},
      components: {
        pagingUpload
      },
      created () {
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
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #test-dom{
      .scrollContent{
        position: absolute;
        top: 0;right: 0;left: 0;bottom: 0;
        .div{
          height: 10rem;
        }
      }
    }
</style>
