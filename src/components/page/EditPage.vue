<template>
  <div class="edit-page">
    <div class="info">
      <label class="title">
        <span>标题：</span>
        <input type="text" v-model="blog.title" placeholder="请输入博客的标题" maxlength="50">
      </label>
      <label class="description">
        <span>描述：</span>
        <input type="text" v-model="blog.description" placeholder="请输入博客的描述" maxlength="200">
      </label>
      <label>
        <span>封面：</span>
        <img :src="blog.cover" alt="" width="50" height="50" />
        <input type="file" accept=".jpg,.png" ref="coverImg" @change="uploadCover">
      </label>
      <button v-if="!$route.params.blogId" @click="postBlog">发布</button>
      <button v-if="$route.params.blogId" @click="updateBlog">保存</button>
    </div>

    <div class="content">
      <textarea class="edit" v-model="blog.content"></textarea>
      <div id="markdown" class="preview" v-html="markdownToHtml" v-highlight></div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import hljs from "highlight.js";

export default {
  name: "EditPage",
  computed: {
    markdownToHtml() {
      return marked(this.blog.content);
    }
  },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        description: "",
        cover: "",
        content: "# 请使用markdown语法\n ## 开始你的表演\n```js\nlet f = new Func();\nconsole.log(f.__proto__); // Object\n```"
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.params.blogId) {
          this.$axios.myRequest.getBlogDetails(to.params.blogId).then((res) => {
            if (res.data.data === null) {
              this.$xMessage.show({
                title: '权限不够！',
                message: "这不是你的博客！",
                type: 'error',
                duration: 3000
              });

              this.$router.go(-1)
            } else {
              res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/")
              const blog = {}
              blog.id = res.data.data.id
              blog.title = res.data.data.title
              blog.description = res.data.data.description
              blog.cover = res.data.data.cover
              blog.content = res.data.data.content

              this.blog = blog
            }
            console.log(res)
          });
        }
      }
    }
  },
  methods: {
    uploadCover() {
      this.blog.cover = `http://localhost:8080/cover/${this.$store.state.userInfo.username}.jpg?${Date.now()}`
    },
    vertify() {
      if (this.blog.title.trim().length != 0 && this.blog.description.trim().length != 0 && this.blog.content.trim().length != 0) {
        return true
      }
      this.$xMessage.show({
        title: '请完善信息后再提交哦！',
        message: "请完善信息后再提交哦！",
        type: 'error',
        duration: 3000
      });
      return false
    },
    prepare() {
      let coverImg = this.$refs.coverImg.files[0]
      const data = new FormData()

      if (coverImg) {
        data.append("coverImg", coverImg)
      }

      for (let i in this.blog) {
        data.append(`${i}`, this.blog[i])
      }
      for (var [a, b] of data.entries()) {
        console.log(a, b);
      }

      return data
    },
    postBlog() {
      if (!this.vertify()) {
        return
      }

      const data = this.prepare()

      this.$axios.myRequest.postBlog(data).then((res) => {
        console.log(res)

        if (res.code === 600) {
          this.$xMessage.show({
            title: '发布成功！',
            message: "快去看看吧！",
            type: 'success',
            duration: 3000
          });
        }

      })
    },
    updateBlog() {
      if (!this.vertify()) {
        return
      }

      const data = this.prepare()

      this.$axios.myRequest.updateBlog(data).then((res) => {
        console.log(res)

        this.$xMessage.show({
          title: '更新成功！',
          message: "快去看看吧！",
          type: 'success',
          duration: 3000
        });
      })
    }
  },
  beforeCreate() {
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  },
}
</script>

<style lang="less" scoped>
.edit-page {
  background-color: white;
}

.content {
  width: 100%;
  min-height: 100vh;
  display: flex;
  position: relative;
  border-top: 2px dashed @theme-color;
  border-bottom: 2px dashed @theme-color;

  .edit {
    width: 50%;
    height: 100vh;
    border: none;
    outline: none;
    padding: 50px;
    border-right: 2px dashed @theme-color;
    resize: none;
  }

  .preview {
    width: 50%;
    height: 100vh;
    position: relative;
    padding: 50px;
    overflow: scroll;
  }

  .preview::after {
    content: "预览区";
    position: absolute;
    display: block;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    font-size: 5vw;
    opacity: 0.1;
    z-index: 999;
  }
}

.content:after {
  content: "编辑区";
  position: absolute;
  display: block;
  top: 40%;
  left: 20%;
  transform: translate(-20%, -40%);
  font-size: 5vw;
  opacity: 0.1;
  user-select: none;
  z-index: 999;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 69px;
  padding: 50px;

  label {
    display: flex;
    align-items: center;
  }

  .title input,
  .description input {
    background-color: white;
    outline: none;
    border: none;
    border-bottom: 1px solid @theme-color;
    padding: 5px;
    flex-grow: 1;
  }

  .description {
    flex-grow: 0.7;
  }

  button {
    background-color: @theme-color;
    color: white;
    border: 1px solid @theme-color;
    border-radius: 5px;
    padding: 5px 50px;
    cursor: pointer;
    opacity: 0.8;
    transition: @transition-time;
  }

  button:hover {
    opacity: 1;
  }
}
</style>