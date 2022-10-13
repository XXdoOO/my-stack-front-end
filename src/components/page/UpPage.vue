<template>
  <main>
    <ListBlock :blogList=blogList :modifyList=modifyList />
  </main>
</template>
<script>
import ListBlock from "../block/ListBlock.vue";
export default {
  name: "IndexPage",
  components: { ListBlock },
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

    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios.myRequest.getBlogList(10, 20).then((res) => {
        console.log(res)

        res.data.data.forEach((i) => {
          i.isStar = false;
        })

        for (const item of vm.$store.state.myStarList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isStar = true;
            }
          })
        }

        for (const item of vm.$store.state.myUpList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isUp = true;
            }
          })
        }

        for (const item of vm.$store.state.myDownList) {
          res.data.data.forEach((i) => {
            if (item.id === i.id) {
              i.isDown = true;
            }
          })
        }

        vm.blogList = res.data.data
      })
    });
  }
};
</script>
<style lang="less" scoped>

</style>