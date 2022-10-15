<template>
  <main class="container">
    <ListBlock :blogList=blogList :modifyList=modifyList />

    <GoTop></GoTop>
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
import GoTop from "../block/GoTop.vue";
export default {
  name: "IndexPage",
  components: { ListBlock, GoTop },
  data() {
    return {
      blogList: []
    }
  },
  methods: {
    modifyList(index, opt) {
      console.log(index, opt)
      const item = this.blogList[index]
      const key = opt.slice(2, opt.lenght).toLowerCase()
      const value = item[key]

      this.$set(item, opt, !item[opt])

      if (item[opt]) {
        this.$set(item, key, value + 1)
      } else {
        this.$set(item, key, value - 1)
      }
    },
    getBlogList() {
      this.$axios.myRequest.getBlogList(10, 20).then((res) => {
        console.log(res)

        res.data.data.forEach((i) => {
          i.isStar = false;
        })

        for (const item of this.$store.state.myStarList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isStar = true;
            }
          })
        }

        for (const item of this.$store.state.myUpList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isUp = true;
            }
          })
        }

        for (const item of this.$store.state.myDownList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isDown = true;
            }
          })
        }

        this.blogList = res.data.data
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.userInfo.isLogin) {
        vm.$store.dispatch("refresh").then((res) => {
          vm.$store.commit("refresh", res);

          vm.getBlogList()
        });
      } else {
        vm.getBlogList()
      }
    });
  }
};
</script>
<style lang="less" scoped>

</style>