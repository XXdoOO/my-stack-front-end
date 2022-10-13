<template>
  <div class="edit-page">
    <div class="info">
      <label class="title">
        <span>标题：</span>
        <input type="text" v-model="blog.title" placeholder="请输入博客的标题">
      </label>
      <label class="description">
        <span>描述：</span>
        <input type="text" v-model="blog.description" placeholder="请输入博客的描述">
      </label>
      <label>
        <span>封面：</span>
        <input type="file" accept=".jpg,.png">
      </label>
      <button @click="postBlog">发布</button>
    </div>

    <div class="content">
      <textarea class="edit" v-model="blog.content"></textarea>
      <div class="markdown preview" v-html="markdownToHtml" v-highlight></div>
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
        title: "",
        description: "",
        cover: "",
        content: "# 请使用markdown语法\n ## 开始你的表演\n```js\nlet f = new Func();\nconsole.log(f.__proto__); // Object\n```"
      }
    }
  },
  methods: {
    postBlog() {

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
  }
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
    border: none;
    outline: none;
    padding: 50px;
    border-right: 2px dashed @theme-color;
    resize: none;
  }

  .preview {
    width: 50%;
    position: relative;
    padding: 50px;
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