<template>
  <div class="empty">
    <img src="../../assets/img/empty.png" alt="">
    <span class="msg">这里空空如也哦</span>
  </div>
</template>
<script>
export default {
  name: "EmptyStatus",
}
</script>
<style lang="less">
.empty {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 0 0 5px 5px;
  position: relative;

  .msg {
    position: absolute;
    color: @gray-color-dep;
    margin-bottom: 50px;
  }
}
</style>