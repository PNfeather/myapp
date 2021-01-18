<template>
  <app-page>
    <app-header title='routerTest1'></app-header>
    <div @click="jump('/routerTest2')">
      跳2
    </div>
  </app-page>
</template>

<script>
export default {
  name: 'routerTest1',
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
