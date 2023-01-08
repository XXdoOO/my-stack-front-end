<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetails, handleBlog } from '@/api/blog'
import { getCommentList, postComment, deleteComment, handleComment } from '@/api/comment'
import util from '@/util/util'
import { store } from '@/stores/index'

const $route = useRoute()
const userInfo = store().userInfo

const blogId = $route.params.blogId as string
let blog = ref(null)
let commentList = ref(null)
let content = ref<string>('')
let content2 = ref<string>('')


const init = () => {
  getBlogDetails(blogId).then((data: any) => {
    blog.value = data
    blog.value.content = `# ${data.title}\n## ${data.description}\n${data.content}`
  })

  getCommentList({ blogId, pageSize: 100 }).then((res: any) => {
    res.list.forEach(item => {
      item.isShow = false
    })

    commentList.value = res.list

    commentList.value.forEach(item => {
      getCommentList({ blogId, parent: item.id, pageSize: 3 }).then((res: any) => {
        res.list.forEach(item => {
          item.isShow = false
        })

        item.children = res.list
        item.total = res.total
        item.pageNum = 1
      })
    })
  })
}

const getMoreReply = (item) => {
  getCommentList({ blogId, parent: item.id, pageNum: ++item.pageNum, pageSize: 3 }).then((res: any) => {
    res.list.forEach(item => {
      item.show = false
    })

    item.children.push(...res.list)
    item.total = res.total
  })
}

const reply = (item) => {
  let flag = true
  if (item.isShow) {
    flag = false
  }
  commentList.value.forEach(comment => {
    comment.isShow = false

    comment.children?.forEach(c => {
      c.isShow = false
    })
  })

  if (flag) {
    item.isShow = true
  }
}

const handlePostComment = (parent, receiveId, receiveNickname, content) => {
  postComment({
    blogId,
    parent,
    receiveId,
    content
  }).then((res: any) => {
    res.senderAvatar = userInfo.avatar
    res.senderNickname = userInfo.nickname
    res.receiveNickname = receiveNickname
    res.children = []
    console.log(res)

    if (parent) {
      for (const item of commentList.value) {
        if (item.id == parent) {
          item.children.push(res)
          break
        }
      }
    } else {
      commentList.value.push(res)
    }

    commentList.value.forEach(comment => {
      comment.isShow = false

      comment.children?.forEach(c => {
        c.isShow = false
      })
    })
  })
}

const handleDeleteComment = (commentId: string | number) => {
  deleteComment(commentId).then(data => {
    console.log(data);

    foo: for (const index in commentList.value) {
      const item = commentList.value[index]

      if (item.id == commentId) {
        commentList.value.splice(index, 1)
        break foo
      }

      for (const i in item.children) {
        const j = item.children[i]

        if (j.id == commentId) {
          item.children.splice(i, 1)
          break foo
        }
      }
    }
  })
}

const handleBlog2 = (blogId: string | number, type: 0 | 1 | 2) => {
  handleBlog(blogId, type).then(data => {
    console.log(data);

  })
}

const handleComment2 = (commentId: string | number, type: 0 | 1) => {
  handleComment(commentId, type).then(data => {
    console.log(data)
  })
}

init()
</script>

<template>
  <main class="container" v-if="blog">
    <div class="content">
      <div class="blog">
        <v-md-preview :text="blog.content"></v-md-preview>
        <div class="ip">
          <my-ip>{{ blog.ipTerritory }}</my-ip>
          <my-icon icon="history" type="text">{{ blog.createTime }}</my-icon>
        </div>
      </div>

      <div class="comments">
        <div class="header">
          <div>
            <my-avatar :src="`/api${userInfo?.avatar}`" />
          </div>
          <div class="area">
            <textarea class="content" v-model="content" placeholder="说说你的看法"></textarea>
            <my-button class="btn" @click="handlePostComment('', '', '', content)">发布</my-button>
          </div>
        </div>

        <div class="comment" v-for="item in commentList" :key="item.id">
          <my-avatar :src="`/api${item.senderAvatar}`" />
          <div class="detail">
            <div class="top">
              <div class="nickname">{{ item.senderNickname }}</div>
              <div class="time">{{ item.createTime }}</div>
            </div>
            <p class="center">{{ item.content }}</p>
            <div class="bottom">
              <my-ip size="small">{{ item.ipTerritory }}</my-ip>
              <my-button type="text" @click="reply(item)" style="margin-left:15px">{{
                item.isShow ? '收起' : '回复'
              }}</my-button>
              <div class="icons">
                <my-icon @click="handleDeleteComment(item.id)" icon="delete"
                  v-if="item.senderId == userInfo?.id"></my-icon>
                <my-icon @click="handleComment2(item.id, 1)" v-model:num="item.down" v-model:active="item.isDown"
                  icon="down-active" />
                <my-icon @click="handleComment2(item.id, 0)" v-model:num="item.up" v-model:active="item.isUp"
                  icon="up-active" />
              </div>
            </div>
            <div class="area" v-show="item.isShow">
              <textarea class="content" v-model="content2" placeholder="说说你的看法"></textarea>
              <my-button class="btn"
                @click="handlePostComment(item.id, item.senderId, item.senderNickname, content2)">回复</my-button>
            </div>

            <div class="children" v-if="item.children?.length != 0">
              <div class="comment" v-for="i in item.children">
                <my-avatar :src="`/api${i.senderAvatar}`" size="40px" />
                <div class="detail">
                  <div class="top">
                    <div class="nickname">{{ i.senderNickname }}</div>
                    <my-icon class="arrow" icon="arrow-right" type="text"></my-icon>
                    <div class="nickname">{{ i.receiveNickname }}</div>
                    <div class="time">{{ i.createTime }}</div>
                  </div>
                  <p class="center">{{ i.content }}</p>
                  <div class="bottom">
                    <my-ip size="small">{{ i.ipTerritory }}</my-ip>
                    <my-button type="text" @click="reply(i)" style="margin-left:15px">{{
                      i.isShow ? '收起' : '回复'
                    }}</my-button>
                    <div class="icons">
                      <my-icon @click="handleDeleteComment(i.id)" icon="delete"
                        v-if="i.senderId == userInfo?.id"></my-icon>
                      <my-icon @click="handleComment2(i.id, 1)" v-model:num="i.down" v-model:active="i.isDown"
                        icon="down-active" />
                      <my-icon @click="handleComment2(i.id, 0)" v-model:num="i.up" v-model:active="i.isUp"
                        icon="up-active" />
                    </div>
                  </div>
                  <div class="area" v-show="i.isShow">
                    <textarea class="content" v-model="content2" placeholder="说说你的看法"></textarea>
                    <my-button class="btn"
                      @click="handlePostComment(item.id, i.senderId, i.senderNickname, content2)">回复</my-button>
                  </div>
                </div>
              </div>
              <my-icon class="collapse" v-if="item.total > item.children?.length" icon="arrow-down"
                @click="getMoreReply(item)">展开更多回复</my-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="author-info">
        <router-link :to="`/user/${blog.authorInfo.id}`" class="face">
          <my-avatar :src="`/api${blog.authorInfo.avatar}`" />
          <span> {{ blog.authorInfo.nickname }}</span>
        </router-link>
        <nav class="account">
          <router-link :to="`/user/${blog.authorInfo.id}`">
            <span>{{ blog.authorInfo.passCount }}</span>
            <span>发布</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.id}`">
            <span>{{ blog.authorInfo.up }}</span>
            <span>顶过</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.id}`">
            <span>{{ blog.authorInfo.down }}</span>
            <span>踩过</span>
          </router-link>
        </nav>
      </div>
      <div class="icon-bar">
        <my-icon @click="handleBlog2(blog.id, 0)" v-model:num="blog.up" v-model:active="blog.isUp" icon="up-active" />
        <my-icon @click="handleBlog2(blog.id, 1)" v-model:num="blog.down" v-model:active="blog.isDown"
          icon="down-active" />
        <my-icon @click="handleBlog2(blog.id, 2)" v-model:num="blog.star" v-model:active="blog.isStar"
          icon="star-active" />
        <my-icon icon="view">{{ util.formatNum(blog.views) }}</my-icon>
      </div>
    </div>
  </main>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: flex-start;

  .content {
    flex-grow: 1;
    border-radius: 5px;
    overflow: hidden;
  }
}

.sidebar {
  width: 230px;
  margin-left: @gap;
  border-radius: 5px;
}

.author-info {
  padding: 20px 30px;
  background-color: white;
  border-radius: 5px 5px 0 0;

  .face {
    display: flex;
    align-items: center;

    span {
      color: @gray-color-dep;
      margin-left: 10px;
    }
  }

  .account {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: black;
      font-size: 20px;

      span:last-child {
        font-size: 12px;
        color: @gray-color-dep;
      }
    }
  }
}

.icon-bar {
  background-color: white;
  margin-top: @gap;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 0 0 5px 5px;
}

.comments {
  margin-top: @gap;
  background-color: white;
  padding: 30px;

  .header {
    display: flex;
  }

  img {
    margin-right: 20px;
  }
}

.area {
  flex-grow: 1;

  .content {
    width: 100%;
    height: 80px;
    outline: none;
    border-color: @border-color;
    border-radius: 5px;
    padding: 10px;
    resize: none;
  }

  .btn {
    margin-left: auto;
    margin-top: 5px;
  }
}

.comment {
  display: flex;
  padding: 10px 0;

  .detail {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      align-items: center;

      .nickname {
        color: @gray-color-dep;
      }

      .arrow {
        font-size: 8px;
        margin: 0 10px;
      }

      .time {
        color: @gray-color-dep;
        font-size: 14px;
        margin-left: auto;
      }
    }

    .center {
      font-size: 15px;
      margin-top: 5px;
    }

    .bottom {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin: 10px 0;

      .icons {
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
          margin-left: 40px;
        }
      }
    }
  }
}

.children {
  background-color: @theme-color2;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  transition: @transition-time;

  .nickname {
    font-size: 14px;
  }

}

.collapse {
  margin-left: 50px;
  font-size: 10px;
  cursor: pointer;
  transition: @transition-time;
}

.collapse:hover {
  color: @theme-color;
}

.blog {
  background-color: white;

  .ip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2.5em;
    color: @gray-color-dep;
    font-size: 12px;
  }
}
</style>