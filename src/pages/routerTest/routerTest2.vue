<template>
  <app-page>
    <app-header title='routerTest2'></app-header>
    <mt-button @click="jump('/routerTest1')">
      push(routerTest1)
    </mt-button>
    <mt-button @click="jump('/routerTest3')">
      push(routerTest3)
    </mt-button>
    <mt-button @click="jump('/routerTest4')">
      push(routerTest4)
    </mt-button>
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
