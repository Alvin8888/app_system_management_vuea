<template>
  <div>
    <pc-nav-bar v-if="$store.state.user.perData.length" />
    <pc-main />
  </div>
</template>

<script>
import PcNavBar from './PcNavBar'
import PcMain from '@/components/PcMain'

export default {
  data() {
    return {}
  },
  components: {
    PcNavBar,
    PcMain
  }
}
</script>

<style>
</style>
