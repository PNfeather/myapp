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
    updataNav () {
      this.$parent.updateNav();
    }
  },
  watch: {
    label () {
      this.updataNav();
    }
  },
  components: {},
  created () {},
  mounted () {
    this.updataNav();
  }
};
</script>

<style scoped>

</style>
