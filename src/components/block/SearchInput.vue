<template>
  <div class="search-input">
    <input type="text" placeholder="请输入搜索关键词" v-model="keywords" @keyup.enter="search(keywords)" />
    <i title="点击搜索" @click="search(keywords)"></i>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    search(keywords) {
      this.$router.push(`/search/${keywords}`)
    },
  },
};
</script>

<style lang="less" scoped>
.search-input {
  position: relative;
  width: 220px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid @gray-color;
  overflow: hidden;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 10px;
  }

  i {
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    right: 5px;
    top: calc(50% - 16px);
    background-image: url(./../../assets/img/search.png);
    background-size: cover;
    cursor: pointer;
    transition: @transition-time;
  }

  i:hover {
    background-image: url(./../../assets/img/search-hover.png);
  }
}
</style>