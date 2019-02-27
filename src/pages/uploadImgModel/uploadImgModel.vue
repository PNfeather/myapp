<template>
    <app-page name="upload-img-model">
        <app-header :title="title"></app-header>
        <app-main>
          <upload-img></upload-img>
        </app-main>
    </app-page>
</template>

<script>
  import uploadImg from '@/components/uploadImg/uploadImg';
    export default {
      name: 'upload-img-model',
      data () {
        return {
          title: '上传预览图片'
        };
      },
      methods: {},
      components: {
        uploadImg
      },
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    [name="upload-img-model"]{

    }
</style>
