<script setup lang="ts">
import { ref, reactive } from 'vue'

const content = ref('')
</script>

<template>
  <div class="info">
    <label class="title"><span>标题：</span><input type="text" /></label>
    <label class="description"><span>描述：</span><input type="text" /></label>
    <label class="cover"><span>封面：</span><input type="file" hidden /></label>
  </div>
  <v-md-editor id="markdown" v-model="content"></v-md-editor>
</template>

<style lang="less" scoped>
.info {
  background-color: white;
  margin-bottom: @gap;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  label.title::before,
  label.description::before {
    content: "*";
    color: red;
  }

  input {
    border: none;
    border-bottom: 1px solid @theme-color;
    padding: 5px;
  }
}
</style>