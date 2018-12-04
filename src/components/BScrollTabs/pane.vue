<template>
  <div class="pane" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pane',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: true
    };
  },
  methods: {
    updateNav () { // pane数据变更后重加在父级tabs的updateNav方法navList
      this.$parent.updateNav();
    }
  },
  watch: {
    label () {
      this.updateNav();
    }
  },
  components: {},
  created () {},
  mounted () {
    this.updateNav();
  }
};
</script>

<style scoped>
  .pane{
    padding-top: .3rem;
  }
</style>
