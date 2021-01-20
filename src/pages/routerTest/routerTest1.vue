<template>
  <app-page>
    <app-header title='routerTest1'></app-header>
    <mt-button @click="jump('/routerTest2')">
      push(routerTest2)
    </mt-button>
    <mt-button @click="go(1)">
      go(1)
    </mt-button>
    <mt-button @click="go(2)">
      go(2)
    </mt-button>
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
    },
    go (param) {
      this.$router.go(param);
    }
  }
};
</script>
