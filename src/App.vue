<template>
  <div>
    <keep-alive v-if="isLoggedIn">
      <router-view v-if="$route.meta.keepAlive && isRouterAlive " />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive || !isLoggedIn" />
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      isLoggedIn: false
    }
  },
  mounted() {},

  watch: {
    $route(to, from) {
      // if the route changes...
      const token = localStorage.getItem('token') || ''
      if (token) {
        // firebase returns null if user logged out
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    isAlive() {
      this.isRouterAlive
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  created() {}

}
</script>

<style>
body {
  font-family: "微软雅黑";
  margin: 0 auto;
}
</style>
