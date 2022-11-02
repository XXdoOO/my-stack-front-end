<template>
  <div>
    总共{{total}}页
  </div>
</template>

<script>
export default {
  name: "MyPagination",
  props: {
    total: {
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1
    }
  }
}
</script>

<style>

</style>