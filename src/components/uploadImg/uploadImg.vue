<template>
    <section name="upload-img">
      <img :src="avatar" class="img-avatar">
      <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
    </section>
</template>

<script>
    export default {
      name: 'upload-img',
      data () {
        return {
          avatar: require('./img/jia.png')
        };
      },
      methods: {
        changeImage (e) {
          let file = e.target.files[0];
          let reader = new FileReader();
          let that = this;
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            that.avatar = this.result;
          };
        }
      },
      components: {},
      created () {},
      mounted () {}
    };
</script>

<style lang='less' scoped>
    [name="upload-img"]{
      height: 8rem;
      width: 8rem;
      margin: 0.3rem auto;
      border: 0.01rem solid #ededed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .img-avatar {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .uppic {
        display: inline-block;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        opacity: 0;
        z-index: 99;
      }
    }
</style>
