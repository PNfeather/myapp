<template>
  <app-page>
    <app-header title='routerTest2'></app-header>
    <div @click="jump('/routerTest3')">
      跳3
    </div>
    <div @click="jump('/routerTest4')">
      跳4
    </div>
  </app-page>
</template>

<script>
export default {
  name: 'routerTest2',
  data () {
    return {
    };
  },
  methods: {
    jump (path) {
      this.$router.push({ path });
    }
  }
};
</script>
