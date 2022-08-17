<template lang="">
    <div>
        <HeaderBlock />
        <ShowBlock />
    </div>
</template>
<script>
import HeaderBlock from "../block/HeaderBlock.vue";
import ShowBlock from "../block/ShowBlock.vue";
export default {
  name: "IndexPage",
  components: { HeaderBlock, ShowBlock },
};
</script>
<style lang="less">
</style>