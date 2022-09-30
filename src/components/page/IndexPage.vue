<template>
    <div>
        <HeaderBlock />
        <main>
          <MyBlock />
          <ListBlock :blogList="blogList" />
        </main>
        <!-- <FooterBlock /> -->
    </div>
</template>
<script>
import HeaderBlock from "../block/HeaderBlock.vue";
import ListBlock from "../block/ListBlock.vue";
import MyBlock from "../block/MyBlock.vue";
// import FooterBlock from "../block/FooterBlock.vue";
export default {
  name: "IndexPage",
  components: { HeaderBlock, ListBlock, MyBlock },
  data(){
    return {
      blogList: []
    }
  },
  created(){
    this.axios.get("/getBlogByKeywords?startIndex=10&pageSize=20").then((res)=>{
      console.log(res);
      if(res.data.code === 200){
        this.blogList = res.data.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.root {
    position: relative;
    top: 70px;
  }
</style>