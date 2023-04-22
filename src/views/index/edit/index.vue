<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetails, updateBlog } from '@/api/blog'
import { uploadImage } from '@/api/user'

const tip = ref('已开启自动保存')
const blog = ref({
  id: useRoute().params.blogId ?? '',
  title: '',
  description: '',
  cover: '',
  content: '# 请使用markdown语法\n ## 开始你的表演\n```js\nlet f = new Func();\nconsole.log(f.__proto__); // Object\n```'
})

if (blog.value.id) {
  getBlogDetails(blog.value.id).then((data: any) => {
    blog.value = data

    if (data.cover) {
      blog.value.cover = '/api/' + data.cover
    }
  })
}

const coverImg = ref()

const uploadCover = (e) => {
  blog.value.cover = URL.createObjectURL(e.target.files[0])
}

const handleUploadImage = (event, insertImage, files) => {
  const data = new FormData()
  data.append('image', files[0])
  data.append('blogId', blog.value.id.toString())
  uploadImage(data).then(data => {
    insertImage({
      url: '/api/' + data,
    })
  })
}

watch(() => blog, () => {
  handleUpdateBlog()
}, { deep: true })

let timer: number
const handleUpdateBlog = () => {
  tip.value = '自动保存中...'
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (blog.value.title.trim().length != 0 && blog.value.description.trim().length != 0 && blog.value.content.trim().length != 0) {
      const img = coverImg.value.files[0]

      const data = new FormData()

      if (img) {
        data.append("coverImg", img)
      }

      for (let i in blog.value) {
        data.append(`${i}`, blog.value[i])
      }

      updateBlog(data).then(data => {
        tip.value = '自动保存成功！'
      })
    } else {
      tip.value = '自动保存失败！请完善信息或检查网络！'
    }
  }, 1000)
}
</script>

<template>
  <div class="info">
    <label class="title"><span>标题：</span><input type="text" v-model="blog.title" /></label>
    <label class="description"><span>描述：</span><input type="text" v-model="blog.description" /></label>
    <label class="cover"><span>封面：</span>
      <my-icon v-if="!blog.cover" icon="add" style="font-size:25px"></my-icon>
      <img v-if="blog.cover" :src="blog.cover" width="50" height="50" />
      <input type="file" hidden accept=".jpg,.png" ref="coverImg" @change="uploadCover" />
    </label>
    <my-button class="post" @click="handleUpdateBlog">{{ tip }}</my-button>
  </div>
  <v-md-editor v-model="blog.content" :disabled-menus="[]" @upload-image="handleUploadImage"></v-md-editor>
</template>

<style lang="less" scoped>
.info {
  background-color: white;
  // margin-bottom: @gap;
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
    margin-left: auto;
  }

  .cover {
    cursor: pointer;

    img {
      border-radius: 5px;
    }
  }
}
</style>

<style lang="less">
.v-md-editor.v-md-editor--editable {
  min-height: calc(100vh - 90px);
}

.v-md-editor {
  border-radius: unset;
  box-shadow: unset;
}
</style>