<template>
  <app-page>
    <app-header title='routerTest4'></app-header>
    <div @click="jump('routerTest1')">
      返回1
    </div>
    <div @click="jump(-2)">
      退两步
    </div>
  </app-page>
</template>

<script>
export default {
  name: 'routerTest4',
  data () {
    return {
    };
  },
  methods: {
    jump (path) {
      this.$router.go(path);
    }
  }
};
</script>
