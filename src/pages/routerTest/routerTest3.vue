<template>
  <app-page>
    <app-header title='routerTest3'></app-header>
    <div @click="jump('/routerTest4')">
      跳4
    </div>
  </app-page>
</template>

<script>
export default {
  name: 'routerTest3',
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
