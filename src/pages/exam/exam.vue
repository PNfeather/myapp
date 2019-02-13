<template>
    <app-page id="exam">
        <app-header :title="title"></app-header>
        <app-main v-model="scrollObj">
        </app-main>
    </app-page>
</template>

<script>
    export default {
      name: 'exam',
      data () {
        return {
          title: '模拟测试',
          scrollObj: '',
          questionList: []
        };
      },
      methods: {},
      components: {},
      created () {
        this.$http.get('/exam').then((res) => {
          let data = res.data;
          if (data.resultCode === '000000') {
            this.questionList = [...data.resultData];
            console.log(this.questionList);
          } else {
            this.$toast(data.resultMsg || '网络异常');
          }
        });
      },
      mounted () {}
    };
</script>

<style lang='less' scoped>
    #exam{

    }
</style>
