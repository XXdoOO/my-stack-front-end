<template>
  <i @click="goTop()" class="goTop" :style="{display:display}" title="返回顶部"></i>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      display: 'none'
    }
  },
  methods: {
    goTop() {
      document.documentElement.scrollTop = 0
    },
    scrollToTop() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let browserHeight = window.outerHeight

      if (scrollTop > browserHeight) {
        this.display = 'flex'
      } else {
        this.display = 'none'
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="less" scoped>
.goTop {
  position: fixed;
  right: 50px;
  bottom: 50px;
  // display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 20px;
  background-color: @theme-color;
  background-image: url(../../assets/img/arrow.png);
  background-size: cover;
  color: white;
  border-radius: 50%;
  transform: rotate(180deg);
  cursor: pointer;
}
</style>