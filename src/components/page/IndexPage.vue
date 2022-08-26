<template lang="">
    <div>
        <HeaderBlock />
        <ShowBlock />
        <FooterBlock />
    </div>
</template>
<script>
import HeaderBlock from "../block/HeaderBlock.vue";
import ShowBlock from "../block/ShowBlock.vue";
import FooterBlock from "../block/FooterBlock.vue";
export default {
  name: "IndexPage",
  components: { HeaderBlock, ShowBlock, FooterBlock },
};
</script>
<style lang="less">
</style>