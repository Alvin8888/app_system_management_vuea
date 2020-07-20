<template>
  <div>
    <pc-nav-bar v-if="$store.state.user.perData.length"/>
    <pc-main/>
    <!--        <Menu />-->
  </div>
</template>

<script>
import PcMain from '@/components/PcMain'
import PcNavBar from './module/PcNavBar'

export default {
  name: 'Index',
  components: {
    PcMain,
    PcNavBar
  }
}
</script>

<style scoped>

</style>
