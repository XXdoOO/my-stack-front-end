<script setup lang="ts">
import { ref, reactive } from 'vue'

const value = ref('')
</script>

<template>
  <v-md-editor id="markdown" v-model="value"></v-md-editor>

  <v-md-preview :text="value"></v-md-preview>
</template>

<style lang="less" scoped>

</style>