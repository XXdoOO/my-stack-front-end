<script setup lang="ts">
import { ref, reactive } from 'vue'

const content = ref('')
</script>

<template>
  <v-md-editor id="markdown" v-model="content"></v-md-editor>
</template>

<style lang="less" scoped>

</style>