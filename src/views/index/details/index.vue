<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogDetails } from '@/api/blog'
import { getCommentList, postComment } from '@/api/comment'
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
  getBlogDetails(blogId).then(res => {
    blog.value = res
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

init()
</script>

<template>
  <!-- <v-md-editor id="markdown" v-model="text"></v-md-editor> -->

  <main class="container" v-if="blog">
    <div class="content">
      <v-md-preview :text="blog.content"></v-md-preview>

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
              <my-button type="text" @click="reply(item)">{{ item.isShow ? '收起' : '回复' }}</my-button>
              <div class="icons">
                <my-icon icon="delete" v-if="item.senderId == userInfo?.id"></my-icon>
                <my-icon icon="down-active">{{ util.formatNum(item.up) }}</my-icon>
                <my-icon icon="up-active">{{ util.formatNum(item.down) }}</my-icon>
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
                    <div class="nickname">>{{ i.receiveNickname }}</div>
                    <div class="time">{{ i.createTime }}</div>
                  </div>
                  <p class="center">{{ i.content }}</p>
                  <div class="bottom">
                    <my-button type="text" @click="reply(i)">{{ i.isShow ? '收起' : '回复' }}</my-button>
                    <div class="icons">
                      <my-icon icon="delete" v-if="i.senderId == userInfo?.id"></my-icon>
                      <my-icon icon="down-active">{{ util.formatNum(i.up) }}</my-icon>
                      <my-icon icon="up-active">{{ util.formatNum(i.down) }}</my-icon>
                    </div>
                  </div>
                  <div class="area" v-show="i.isShow">
                    <textarea class="content" v-model="content2" placeholder="说说你的看法"></textarea>
                    <my-button class="btn"
                      @click="handlePostComment(item.id, i.senderId, i.senderNickname, content2)">回复</my-button>
                  </div>
                </div>
              </div>
              <div class="collapse" v-if="item.total > item.children?.length" @click="getMoreReply(item)">展开更多回复</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="author-info">
        <router-link :to="`/user/${blog.authorInfo.id}/postBlogList`" class="face">
          <my-avatar :src="`/api${blog.authorInfo.avatar}`" />
          <span> {{ blog.authorInfo.nickname }}</span>
        </router-link>
        <nav class="account">
          <router-link :to="`/user/${blog.authorInfo.nickname}/postBlogList`">
            <span>{{ blog.authorInfo.passCount }}</span>
            <span>发布</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.nickname}/upBlogList`">
            <span>{{ blog.authorInfo.up }}</span>
            <span>顶过</span>
          </router-link>
          <router-link :to="`/user/${blog.authorInfo.nickname}/downBlogList`">
            <span>{{ blog.authorInfo.down }}</span>
            <span>踩过</span>
          </router-link>
        </nav>
      </div>
      <ul class="icon-bar">
        <li><my-icon icon="up-active">{{ util.formatNum(blog.up) }}</my-icon></li>
        <li><my-icon icon="down-active">{{ util.formatNum(blog.down) }}</my-icon></li>
        <li><my-icon icon="star-active">{{ util.formatNum(blog.star) }}</my-icon></li>
        <li><my-icon icon="view">{{ util.formatNum(blog.views) }}</my-icon></li>
      </ul>
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
  margin-left: @gap;
  border-radius: 5px;
  overflow: hidden;
}

.author-info {
  width: 230px;
  padding: 20px 30px;
  background-color: white;

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

  .nickname {
    font-size: 14px;
  }

}

.collapse {
  margin-left: 50px;
  font-size: 13px;
  cursor: pointer;
  transition: @transition-time;
}

.collapse:hover {
  color: @theme-color;
}
</style>