<template>
    <main class="container details">
        <div class="sidebar">
            <MyBlock :user-info="blog.authorInfo" />

            <ul class="menu">
                <li title="顶数" :class="{ 'up-hover': blog.isUp }">
                    <i title="顶" @click="up(blog.id)"></i>
                    <span>{{ util.formatNum(blog.up) }}</span>
                </li>
                <li title="踩数" :class="{ 'down-hover': blog.isDown }">
                    <i title="踩" @click="down(blog.id)"></i>
                    <span>{{ util.formatNum(blog.down) }}</span>
                </li>
                <li title="收藏数" :class="{ 'star-hover': blog.isStar }">
                    <i title="收藏" @click="star(blog.id)"></i>
                    <span>{{ util.formatNum(blog.star) }}</span>
                </li>
                <li title="浏览数">
                    <i></i>
                    <span>{{ util.formatNum(blog.views) }}</span>
                </li>
            </ul>

            <div id="directory" v-html="directory">

            </div>
        </div>

        <div>

            <MarkdownPreview :initialValue="blog.content" theme="gitHub" v-highlight
                style="margin-left: 217px;border-radius: 5px;overflow: hidden;">
            </MarkdownPreview>

            <div v-if="blog.status == 1" class="comments">
                <div class="post-area">
                    <img class="face" :src="blog.authorInfo.avatar" alt="" width="40" height="40">
                    <textarea cols="30" rows="10" v-model="content" maxlength="100" placeholder="说说你此刻的想法"></textarea>
                </div>

                <button @click="postComment(content)" :class="{ active: $store.state.userInfo }">发表评论</button>

                <div class="comments-area">
                    <div class="hot-comments">热门评论</div>
                    <div class="comment" v-for="(hot, index) in blog.commentsList.hotComments" :key="hot.id">
                        <img :src="hot.authorInfo.avatar" alt="" width="40" height="40" />
                        <div class="content">
                            <router-link :to="`/user/${hot.authorUsername}/postBlogList`">{{ hot.authorInfo.nickname }}
                            </router-link>
                            <p>{{ hot.content }}</p>
                            <div class="bottom-content">
                                <time>{{ util.formatTime(hot.postTime) }}</time>
                                <ul class="menu comment-menu">
                                    <li title="顶数" :class="{ 'up-hover': hot.isUp }">
                                        <i title="顶" @click="upComments('hot', index, hot.id)"></i>
                                        <span>{{ hot.up }}</span>
                                    </li>
                                    <li title="踩数" :class="{ 'down-hover': hot.isDown }">
                                        <i title="踩" @click="downComments('hot', index, hot.id)"></i>
                                        <span>{{ hot.down }}</span>
                                    </li>
                                    <li title="删除这条评论">
                                        <i v-if="$store.state.userInfo && hot.authorUsername === $store.state.userInfo.username"
                                            @click="deleteComments('hotComments', index, hot.id)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div class="new-comments">新评论</div>
                    <div class="comment" v-for="(item, index) in blog.commentsList.newComments" :key="index">
                        <img :src="item.authorInfo.avatar" alt="" width="40" height="40" />
                        <div class="content">
                            <router-link :to="`/user/${item.authorUsername}/postBlogList`">{{ item.authorInfo.nickname
                            }}
                            </router-link>
                            <p>{{ item.content }}</p>
                            <div class="bottom-content">
                                <time>{{ util.formatTime(item.postTime) }}</time>
                                <ul class="menu comment-menu">
                                    <li title="顶数" :class="{ 'up-hover': item.isUp }">
                                        <i title="顶" @click="upComments('new', index, item.id)"></i>
                                        <span>{{ item.up }}</span>
                                    </li>
                                    <li title="踩数" :class="{ 'down-hover': item.isDown }">
                                        <i title="踩" @click="downComments('new', index, item.id)"></i>
                                        <span>{{ item.down }}</span>
                                    </li>
                                    <li title="删除这条评论">
                                        <i v-if="$store.state.userInfo && item.authorUsername === $store.state.userInfo.username"
                                            @click="deleteComments('newComments', index, item.id)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <GoTop></GoTop>
    </main>
</template>
<script>
import MyBlock from "../block/MyBlock.vue"
import GoTop from "../block/GoTop.vue"
import { MarkdownPreview } from 'vue-meditor'

export default {
    name: "DetailPage",
    components: { MyBlock, GoTop, MarkdownPreview },
    data() {
        return {
            blog: {
                content: "",
                isStar: false,
                isUp: false,
                isDown: false,
                authorInfo: {
                    avatar: ""
                },
                commentsList: {
                    hotComments: [{
                        isUp: false,
                        isDown: false,
                        authorInfo: {},
                        postTime: ""
                    }],
                    newComments: [{
                        isUp: false,
                        isDown: false,
                        authorInfo: {},
                        postTime: ""
                    }],
                },
            },
            directory: null,
            content: ""
        }
    },
    methods: {
        syncData(opt) {
            this.blog[opt] = !this.blog[opt]

            const key = opt.slice(2, opt.lenght).toLowerCase()

            if (this.blog[opt]) {
                this.blog[key]++
            } else {
                this.blog[key]--
            }
        },
        up(blogId) {
            this.$axios.myRequest.up(blogId).then((res) => {
                console.log(res)

                this.syncData("isUp")
            })
        },
        down(blogId) {
            this.$axios.myRequest.down(blogId).then((res) => {
                console.log(res)

                this.syncData("isDown")
            })
        },
        star(blogId) {
            this.$axios.myRequest.star(blogId).then((res) => {
                console.log(res)

                this.syncData("isStar")
            })
        },
        postComment(content) {
            
            
            const data = {
                blogId: this.blog.id,
                content: content
            }
            this.$axios.myRequest.postComments(data).then((res) => {
                console.log(res)

                this.blog.commentsList.newComments.unshift({
                    id: res.data,
                    authorInfo: this.blog.authorInfo,
                    authorUsername: this.$store.state.userInfo.username,
                    blogId: this.blog.id,
                    content: this.content,
                    up: 0,
                    down: 0,
                    isUp: false,
                    isDown: false,
                    postTime: "刚刚",

                })
                this.content = ""
            })
        },
        deleteComments(type, index, commentsId) {
            this.$axios.myRequest.deleteComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    this.blog.commentsList[type].splice(index, 1)

                    this.$xMessage.show({
                        title: '删除成功！',
                        message: "",
                        type: 'success',
                        duration: 3000
                    });
                }
            })
        },
        upComments(type, index, commentsId) {
            this.$axios.myRequest.upComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    if (type === "hot") {
                        this.blog.commentsList.hotComments[index].isUp = !this.blog.commentsList.hotComments[index].isUp

                        if (this.blog.commentsList.hotComments[index].isUp) {
                            this.blog.commentsList.hotComments[index].up++
                        } else {
                            this.blog.commentsList.hotComments[index].up--
                        }
                    } else {
                        this.blog.commentsList.newComments[index].isUp = !this.blog.commentsList.newComments[index].isUp

                        if (this.blog.commentsList.newComments[index].isUp) {
                            this.blog.commentsList.newComments[index].up++
                        } else {
                            this.blog.commentsList.newComments[index].up--
                        }
                    }

                }
            })
        },
        downComments(type, index, commentsId) {
            this.$axios.myRequest.downComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    if (type === "hot") {
                        this.blog.commentsList.hotComments[index].isDown = !this.blog.commentsList.hotComments[index].isDown

                        if (this.blog.commentsList.hotComments[index].isDown) {
                            this.blog.commentsList.hotComments[index].down++
                        } else {
                            this.blog.commentsList.hotComments[index].down--
                        }
                    } else {
                        this.blog.commentsList.newComments[index].isDown = !this.blog.commentsList.newComments[index].isDown

                        if (this.blog.commentsList.newComments[index].isDown) {
                            this.blog.commentsList.newComments[index].down++
                        } else {
                            this.blog.commentsList.newComments[index].down--
                        }
                    }

                }
            })
        },
        createDirectory() {
            const content = this.$refs.markdown.children
            console.log(content[0])
            var arr = [{
                content: '',
                children: []
            }]
            let h1 = 0
            let h2 = 0
            let h3 = 0
            let h4 = 0
            let h5 = 0
            let element
            let localName
            for (let i = 0; i < content.length; i++) {
                element = { content: '', children: [] }
                localName = content[i].localName

                if (localName === "h1" || localName === "h2" || localName === "h3" || localName === "h4" || localName === "h5" || localName === "h6") {
                    element.content = content[i].innerHTML
                }

                console.log(localName, arr)

                if (localName === 'h1') {
                    if (h1 === 0) {
                        arr[0] = element
                    } else {
                        arr.push(element)
                    }
                    h1++
                    h2 = 0
                    h3 = 0
                    h4 = 0
                    h5 = 0
                } else if (localName === 'h2') {
                    arr[h1 - 1].children.push(element)
                    h2++
                    h3 = 0
                    h4 = 0
                    h5 = 0
                } else if (localName === 'h3') {
                    arr[h1 - 1].children[h2 - 1].children.push(element)
                    h3++
                    h4 = 0
                    h5 = 0
                } else if (localName === 'h4') {
                    arr[h1 - 1].children[h2 - 1].children[h3 - 1].children.push(element)
                    h4++
                    h5 = 0
                } else if (localName === 'h5') {
                    arr[h1 - 1].children[h2 - 1].children[h3 - 1].children[h4 - 1].children.push(element)
                    h5++
                } else if (localName === 'h6') {
                    arr[h1 - 1].children[h2 - 1].children[h3 - 1].children[h4 - 1].children[h5 - 1].children.push(element)
                }
            }

            console.log(arr)
        },
        getBlogDetails(blogId) {
            this.$axios.myRequest.getBlogDetails(blogId).then((res) => {
                res.data.content = res.data.content.replace(/u002F/g, "/")

                // console.log(res.data.content)
                this.blog = res.data
            });
        }
    },
    mounted() {
        // this.createDirectory()
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.getBlogDetails(to.params.blogId)
        });
    }
}
</script>
<style lang="less" scoped>
.details {
    margin: 80px auto 30px auto;

    #markdown {
        margin-left: 217px;
        background-color: white;
        border-radius: 5px;
        padding: 30px;
    }
}

.sidebar {
    position: fixed;
}

.menu {
    display: flex;
    justify-content: space-between;
    width: 210px;
    margin-top: 5px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;

    li {
        cursor: pointer;
        display: flex;
        align-items: center;

        i {
            width: 21px;
            height: 21px;
            display: block;
            background-size: cover;
            transition: @transition-time;
        }

        span {
            font-size: 14px;
            line-height: 14px;
            color: @gray-color-dep;
        }
    }

    li:last-child {
        padding-right: 0;
    }

    li:first-child i {
        background-image: url(../../assets/img/up.png);
    }

    li:nth-child(2) i {
        background-image: url(../../assets/img/up.png);
        transform: rotate(180deg);
    }

    li:first-child i:hover,
    li:nth-child(2) i:hover,
    li.up-hover i,
    li.down-hover i {
        background-image: url(../../assets/img/up-hover.png);
    }

    li:nth-child(3) i {
        background-image: url(../../assets/img/star.png);
    }

    li:nth-child(3) i:hover,
    li.star-hover i {
        background-image: url(../../assets/img/star-hover.png);
    }

    li:nth-child(4) i {
        background-image: url(../../assets/img/views.png);
    }
}

.comment-menu {
    padding: 0;
    width: 150px;

    li:nth-child(3) i {
        background-image: url(../../assets/img/delete.png);
    }

    li:nth-child(3) i:hover,
    li.star-hover i {
        background-image: url(../../assets/img/delete-hover.png);
    }
}

.comments {
    margin-top: 5px;
    margin-left: 217px;
    background-color: white;
    border-radius: 5px;
    padding: 30px 40px;

    .post-area {
        display: flex;
        justify-content: space-between;

        img {
            border-radius: 50%;
        }

        textarea {
            flex-grow: 0.96;
            height: 100px;
            border-radius: 5px;
            outline: none;
            padding: 5px;
            resize: none;
            border-color: @theme-color;
        }
    }

    button {
        margin-top: 10px;
        margin-left: auto;
        display: block;
        border-radius: 5px;
        padding: 5px 10px;
        border: 1px solid @theme-color-shallow;
        background-color: @theme-color-shallow;
        cursor: pointer;
        color: white;
    }

    button.active {
        background-color: @theme-color;
        border-color: @theme-color;
    }

    .comments-area {

        .hot-comments,
        .new-comments {
            margin-top: 20px;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 18px;
        }

        .hot-comments {
            color: red;
        }
    }
}

.comment {
    display: flex;
    margin-bottom: 15px;

    img {
        border-radius: 50%;
    }

    .content {
        margin-left: 20px;
        flex-grow: 1;

        a {
            display: block;
            margin-top: 5px;
        }

        p {
            margin: 10px 0 5px 0;
            color: @gray-color-dep;
            font-size: 15px;
        }

        .bottom-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            time {
                font-size: 13px;
                color: @gray-color-dep;
            }
        }
    }
}
</style>