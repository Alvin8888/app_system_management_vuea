<template>
  <div class="tabs">
    <div @click="goPage(0,'upOrder')" :class="getType(0) ? 'un-upOrder' : '' ">未打单</div>
    <div @click="goPage(1,'unDistribution')" :class="getType(1) ? 'un-distribution' : '' ">待分仓</div>
    <div @click="goPage(2,'distribution')" :class="getType(2) ? 'distribution' : '' ">已分仓</div>
    <div @click="goPage(3,'compulete')" :class="getType(3) ? 'compulete' : '' ">已打单</div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      item: null
    }
  },
  created() {
  },
  activated() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      this.item = this.type
      this.getType(this.type)
    },
    getType(type) {
      if (this.item == type) return true
    },
    goPage(type, url) {
      if (this.$route.query.batch_id) return false
      // 未到后一步不能向前一步
      if (this.item === 1 && type === 0) {
        this.item = type
        this.getType(this.item)
        this.$router.push({
          path: '/mmc/' + url,
          query: {
            date: this.$route.query.date
          }
        })
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="less">
  .tabs {
    display: flex;

    div {

      width: 100px;
      height: 45px;
      color: #666;
      background-color: #f2f2f2;
      cursor: pointer;
      text-align: center;
      line-height: 45px;
      margin-right: 35px;
      border-radius: 5px;
    }

    div:hover {
      color: #999;
    }

    .upOrder {
      color: #fff;
      background-color: #909399;
    }

    .un-distribution {
      color: #666;
      background-color: #ffff00;
    }

    .distribution {
      color: #fff;
      background-color: #409EFF;
    }

    .compulete {
      color: #fff;
      background-color: #00ff00;
    }
  }
</style>
