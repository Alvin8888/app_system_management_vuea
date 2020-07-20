<template>
  <div>
    <pc-header />
    <main-tabs v-if="$store.state.user.perData.length" />
    <router-view />
  </div>
</template>

<script>
import PcHeader from './PcHeader'
import MainTabs from './PcTabs/tabs'
export default {
  components: {
    PcHeader,
    MainTabs
  }
}
</script>

<style>

.header {
  position: absolute;
  background: #242f42;
  line-height: 69px;
  top: 0;
  left: 0;
  right: 0;
}
.navBar {
  position: absolute;
  background: #545c64;
  top: 69px;
  left: 0;
  bottom: 0;
  width: 230px;
  overflow-y: auto;

}
.main {
  position: absolute;
  z-index: 10;
  top: 99px;
  left: 230px;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  /* overflow: hidden; */
}
</style>
