<!--  -->
<template>
  <div class="workbench">工作台</div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style scoped>
.workbench {
  position: absolute;
  z-index: 100;
  /* height: 100%; */
  width: 100%;
  height: 48px;
  top: 70px;
  background: white;
}
</style>
