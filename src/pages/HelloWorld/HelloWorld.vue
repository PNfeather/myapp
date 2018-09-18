<template>
  <div class="firstPage" @click="jumpTest" ref="test">
    {{ msg }}
    <co-longTouch @callBack="longTouch"></co-longTouch>
  </div>
</template>

<script>
import longTouch from '@/components/longTouch/longTouch.vue'
export default {
  name: 'firstPage',
  data () {
    return {
      msg: 'firstPage'
    }
  },
  mounted () {
  },
  methods: {
    jumpTest () {
      this.$router.push({'path': '/test1'})
    },
    longTouch () {
      console.log('长按')
    }
  },
  components: {
    'co-longTouch': longTouch
  }
}
</script>
<style scoped>
  .firstPage{
  }
</style>
