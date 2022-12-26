<script setup lang="ts">
import { ref, reactive } from 'vue'
import xMessage from '@/components/message/index'
import { postBlog } from '@/api/blog'

const blog = reactive({
  title: '',
  description: '',
  cover: '',
  content: '# 请使用markdown语法\n ## 开始你的表演\n```js\nlet f = new Func();\nconsole.log(f.__proto__); // Object\n```'
})

const coverImg = ref()

const uploadCover = (e) => {
  blog.cover = URL.createObjectURL(e.target.files[0])
}

const handlePostBlog = () => {
  if (blog.title.trim().length != 0 && blog.description.trim().length != 0 && blog.content.trim().length != 0) {
    const img = coverImg.value.files[0]

    const data = new FormData()

    if (img) {
      data.append("coverImg", img)
    }

    for (let i in blog) {
      data.append(`${i}`, blog[i])
    }
    for (var [a, b] of data.entries()) {
      console.log(a, b);
    }

    postBlog(data).then(data => {
      console.log(data);

    })
  } else {
    xMessage({
      type: 'error',
      title: '请完善信息',
      message: '请完善信息',
    })
  }
}
</script>

<template>
  <div class="info">
    <label class="title"><span>标题：</span><input type="text" v-model="blog.title" /></label>
    <label class="description"><span>描述：</span><input type="text" v-model="blog.description" /></label>
    <label class="cover"><span>封面：</span>
      <my-icon v-if="!blog.cover" icon="add"></my-icon>
      <img v-if="blog.cover" :src="blog.cover" width="50" height="50" />
      <input type="file" hidden accept=".jpg,.png" ref="coverImg" @change="uploadCover" /></label>
    <my-button class="post" @click="handlePostBlog">发布</my-button>
  </div>
  <v-md-editor class="markdown" v-model="blog.content"></v-md-editor>
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
    margin-right: 50px;
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

  .description input {
    width: 500px;
  }

  .post {
    width: 120px;
    margin-left: auto;
  }

  .cover {
    cursor: pointer;

    img {
      border-radius: 5px;
    }
  }
}

.markdown {
  min-height: 100vh;
}
</style>