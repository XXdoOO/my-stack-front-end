<template>
    <main class="container details">
        <div class="sidebar">
            <MyBlock :user-info="blog.authorInfo" />

            <ul class="menu" style="background-color: white;">
                <li class="up" title="顶数" :class="{ 'up-hover': blog.isUp }">
                    <i title="顶" @click="up(blog.id)"></i>
                    <span>{{ util.formatNum(blog.up) }}</span>
                </li>
                <li class="down" title="踩数" :class="{ 'down-hover': blog.isDown }">
                    <i title="踩" @click="down(blog.id)"></i>
                    <span>{{ util.formatNum(blog.down) }}</span>
                </li>
                <li class="star" title="收藏数" :class="{ 'star-hover': blog.isStar }">
                    <i title="收藏" @click="star(blog.id)"></i>
                    <span>{{ util.formatNum(blog.star) }}</span>
                </li>
                <li class="view" title="浏览数">
                    <i></i>
                    <span>{{ util.formatNum(blog.views) }}</span>
                </li>
            </ul>

            <div id="directory">
                <!-- <template v-for="(d, index) in directory" :key="index" v-html="d">{{d}}</template> -->
            </div>
        </div>

        <div>
            <MarkdownPreview :initialValue="blog.content" theme="gitHub"
                style="margin-left: 217px;border-radius: 5px;overflow: hidden;" ref="markdown">
            </MarkdownPreview>

            <div v-if="blog.status == 1" class="comments">
                <div class="comments-blog">
                    <img v-if="$store.state.userInfo" class="face" :src="$store.state.userInfo.avatar" alt="" width="40"
                        height="40" />
                    <img v-else class="face" src="@/assets/img/avatar.jpg" alt="" width="40" height="40" />
                    <div class="post-area">
                        <textarea cols="30" rows="10" v-model="content" maxlength="100"
                            placeholder="说说你此刻的想法"></textarea>
                        <div class="bottom">
                            <p class="tip" :class="{ 'tip-active': isTip1 }" @animationend="isTip1 = false">{{ tip1 }}
                            </p>
                            <button @click="postComment({
                                blogId: blog.id,
                                content: content
                            })" :class="{ active: $store.state.userInfo }">发表评论</button>
                        </div>

                    </div>
                </div>

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
                                    <li class="reply" @click="openReplyArea(hot.id, hot.senderUsername, true, $event)"
                                        ref="reply">
                                        回复
                                    </li>
                                    <li class="up" title="顶这条评论" :class="{ 'up-hover': hot.isUp }">
                                        <i title="顶" @click="upComments('hot', index, hot.id)"></i>
                                        <span>{{ hot.up }}</span>
                                    </li>
                                    <li class="down" title="踩这条评论" :class="{ 'down-hover': hot.isDown }">
                                        <i title="踩" @click="downComments('hot', index, hot.id)"></i>
                                        <span>{{ hot.down }}</span>
                                    </li>
                                    <li class="delete" title="删除这条评论"
                                        v-if="$store.state.userInfo && hot.senderUsername === $store.state.userInfo.username">
                                        <i @click="deleteComments('hotComments', index, hot.id)"></i>
                                    </li>
                                </ul>
                            </div>

                            <div class="children">
                                <div class="comment" v-for="(h, index) in hot.children" :key="h.id">
                                    <img :src="h.authorInfo.avatar" alt="" width="30" height="30" />
                                    <div class="content">
                                        <div class="nickname">
                                            <router-link :to="`/user/${h.authorUsername}/postBlogList`">{{
                                                    h.authorInfo.nickname
                                            }}
                                            </router-link>

                                            <i v-if="h.receiveUsername"></i>

                                            <router-link v-if="h.receiveUsername"
                                                :to="`/user/${h.receiveUsername}/postBlogList`">{{
                                                        h.receiveNickname
                                                }}
                                            </router-link>
                                        </div>
                                        <p>{{ h.content }}</p>
                                        <div class="bottom-content">
                                            <time>{{ util.formatTime(h.postTime) }}</time>
                                            <ul class="menu comment-menu">
                                                <li class="reply"
                                                    @click="openReplyArea(hot.id, h.senderUsername, false, $event)"
                                                    ref="reply">回复
                                                </li>
                                                <li class="up" title="顶数" :class="{ 'up-hover': h.isUp }">
                                                    <i title="顶" @click="upComments('hot', index, h.id)"></i>
                                                    <span>{{ h.up }}</span>
                                                </li>
                                                <li class="down" title="踩数" :class="{ 'down-hover': h.isDown }">
                                                    <i title="踩" @click="downComments('hot', index, h.id)"></i>
                                                    <span>{{ h.down }}</span>
                                                </li>
                                                <li v-if="$store.state.userInfo && h.senderUsername === $store.state.userInfo.username"
                                                    class="delete" title="删除这条评论">
                                                    <i @click="deleteComments('hotComments', index, h.id)"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="post-area-children" v-show="isShowCommentArea" ref="reply-area">
            <textarea cols="30" rows="10" v-model="comment.content" maxlength="100" placeholder="回复"></textarea>
            <div class="bottom">
                <p class="tip" :class="{ 'tip-active': isTip2 }" @animationend="isTip2 = false">{{ tip2 }}</p>
                <button @click="postComment2(comment)" :class="{ active: $store.state.userInfo }">回复</button>
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
                        postTime: "",
                        children: [{
                            isUp: false,
                            isDown: false,
                            authorInfo: { avatar: "" },
                            postTime: "",
                        }]
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
            content: "",
            comment: {
                content: ""
            },
            isShowCommentArea: false,
            tip1: null,
            isTip1: false,
            tip2: null,
            isTip2: false
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
        postComment(comment) {
            console.log(comment)

            if (comment.content == null || comment.content.length == 0) {
                this.tip1 = '评论不能为空！'
                this.isTip1 = true
            } else {
                this.tip1 = null
                this.isTip1 = false

                this.$axios.myRequest.postComments(comment).then((res) => {
                    console.log(res)

                    // this.blog.commentsList.newComments.unshift(res.data)
                    this.content = ""

                    this.getBlogDetails()
                })
            }
        },
        postComment2(comment) {
            console.log(comment)

            if (comment.content == null || comment.content.length == 0) {
                this.tip2 = '评论不能为空！'
                this.isTip2 = true
            } else {
                this.tip2 = null
                this.isTip2 = false
                this.$axios.myRequest.postComments(comment).then((res) => {
                    console.log(res)
                    this.content = ""
                    this.getBlogDetails()
                })
            }
        },
        deleteComments(type, index, commentsId) {
            this.$axios.myRequest.deleteComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    // this.blog.commentsList[type].splice(index, 1)

                    this.getBlogDetails()

                    this.$xMessage.show({
                        title: '删除成功！',
                        message: "",
                        type: 'success',
                        duration: 3000
                    })
                }
            })
        },
        upComments(type, index, commentsId) {
            this.$axios.myRequest.upComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    this.getBlogDetails()

                    console.log(type, index)
                    // if (type === "hot") {
                    //     this.blog.commentsList.hotComments[index].isUp = !this.blog.commentsList.hotComments[index].isUp

                    //     if (this.blog.commentsList.hotComments[index].isUp) {
                    //         this.blog.commentsList.hotComments[index].up++
                    //     } else {
                    //         this.blog.commentsList.hotComments[index].up--
                    //     }
                    // } else {
                    //     this.blog.commentsList.newComments[index].isUp = !this.blog.commentsList.newComments[index].isUp

                    //     if (this.blog.commentsList.newComments[index].isUp) {
                    //         this.blog.commentsList.newComments[index].up++
                    //     } else {
                    //         this.blog.commentsList.newComments[index].up--
                    //     }
                    // }

                }
            })
        },
        downComments(type, index, commentsId) {
            this.$axios.myRequest.downComments(commentsId).then((res) => {
                console.log(res)
                if (res.code === 600) {
                    this.getBlogDetails()

                    console.log(type, index)
                    // if (type === "hot") {
                    //     this.blog.commentsList.hotComments[index].isDown = !this.blog.commentsList.hotComments[index].isDown

                    //     if (this.blog.commentsList.hotComments[index].isDown) {
                    //         this.blog.commentsList.hotComments[index].down++
                    //     } else {
                    //         this.blog.commentsList.hotComments[index].down--
                    //     }
                    // } else {
                    //     this.blog.commentsList.newComments[index].isDown = !this.blog.commentsList.newComments[index].isDown

                    //     if (this.blog.commentsList.newComments[index].isDown) {
                    //         this.blog.commentsList.newComments[index].down++
                    //     } else {
                    //         this.blog.commentsList.newComments[index].down--
                    //     }
                    // }

                }
            })
        },
        createDirectory() {
            const content = this.$refs.markdown.$el.querySelector('div:first-child').children
            // console.log(content)
            let localName
            let titles = []
            for (let i = 0; i < content.length; i++) {
                localName = content[i].localName
                if (localName === "h1" || localName === "h2" || localName === "h3" || localName === "h4" || localName === "h5" || localName === "h6") {
                    titles.push(content[i])
                }
            }
            // console.log(titles)
            // this.directory = titles
        },
        getBlogDetails() {
            console.log(this.$route.params)
            this.$axios.myRequest.getBlogDetails(this.$route.params.blogId).then((res) => {
                res.data.content = res.data.content.replace(/\\n/g, " \n")
                res.data.content = res.data.content.replace(/\\u.{4}/g, function (e) {
                    return unescape(e.replace(/\\/g, '%'))
                })
                // res.data.content = res.data.content.replace(/<strong.*?>/g, "**")
                // res.data.content = res.data.content.replace(/<\/strong>/g, "**")
                res.data.content = res.data.content.replace(/\\"/g, '"')
                res.data.content = res.data.content.replace(/\\'/g, "'")

                // console.log(res.data.content)
                this.blog = res.data
                this.comment.blogId = this.blog.id
            })
        },
        openReplyArea(parent, senderUsername, isRoot, e) {
            console.log(parent, senderUsername, isRoot, e)

            this.comment = {}

            this.comment.blogId = this.blog.id
            this.comment.parent = parent

            if (!isRoot) {
                this.comment.receiveUsername = senderUsername
            }

            let targetElement = e.target.parentNode.parentNode

            const parentNode = targetElement.parentNode
            if (parentNode.lastChild == targetElement) {
                parentNode.appendChild(this.$refs['reply-area'])
            } else {
                parentNode.insertBefore(this.$refs['reply-area'], targetElement.nextSibling)
            }

            this.isShowCommentArea = true
            console.log(this.isShowCommentArea)
            this.$nextTick(() => {
                console.log(this.isShowCommentArea)
                this.$refs['reply-area'].querySelector('textarea').focus()
            })

            document.addEventListener('click', this.handlerClick)
        },
        handlerClick(event) {
            let isSelf = this.$refs['reply-area'].contains(event.target)
            let isReply = false

            for (const item of this.$refs.reply) {
                if (item.contains(event.target)) {
                    isReply = true
                }
            }
            if (!isSelf && !isReply) {
                console.log('没在区域里面-->>>')
                this.isShowCommentArea = false

                document.removeEventListener('click', this.handlerClick)
            }
        }
    },
    created() {
        this.getBlogDetails()
    },
}
</script>
<style lang="less" scoped>
@keyframes plusOne {
    0% {
        opacity: 0;
        top: 0;
    }

    50% {
        opacity: 1;
        top: -15px;
    }

    100% {
        opacity: 0;
    }
}

@keyframes tip {
    0% {
        margin-left: 0;
    }

    25% {
        margin-left: 30px;
    }

    50% {
        margin-left: 0;
    }

    75% {
        margin-left: 30px;
    }

    100% {
        margin-left: 0;
    }
}

.comments-blog {
    display: flex;

    img {
        border-radius: 50%;
        border: 1px solid @border-color;
    }

    .post-area {
        width: 100%;
        margin-left: 20px;

        textarea {
            width: 100%;
        }
    }
}


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
            position: relative;
        }

        i::before {
            content: "+1";
            position: absolute;
            top: 0;
            left: 2px;
            color: @theme-color;
            opacity: 0;
            font-size: 12px;
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

    li.up i {
        background-image: url(../../assets/img/up.png);
    }

    li.down i {
        background-image: url(../../assets/img/down.png);
    }


    li.delete i {
        background-image: url(@/assets/img/delete.png);
    }

    li.up-hover i,
    li.up i:hover {
        background-image: url(@/assets/img/up-hover.png);
    }

    li.up i:hover {
        transform: scale(1.3);
    }

    li.down-hover i,
    li.down i:hover {
        background-image: url(@/assets/img/down-hover.png);
    }

    li.down i:hover {
        transform: scale(1.3);
    }

    li.delete i:hover {
        background-image: url(@/assets/img/delete-hover.png);
        transform: scale(1.3);
    }

    li.star i {
        background-image: url(@/assets/img/star.png);
    }


    li.star i:hover {
        transform: scale(1.3);
    }

    li.star-hover i,
    li.star i:hover {
        background-image: url(@/assets/img/star-hover.png);
    }

    li.view i {
        background-image: url(@/assets/img/views.png);
    }

    li.up-hover i::before,
    li.down-hover i::before,
    li.star-hover i::before {
        animation: plusOne 1s;
    }
}

.comment-menu {
    padding: 0;
    width: 150px;

    .reply {
        color: @gray-color-dep;
        font-size: 14px;
        transition: @transition-time;
    }

    .reply:hover {
        color: @theme-color;
    }
}

.comments {
    margin-top: 5px;
    margin-left: 217px;
    background-color: white;
    border-radius: 5px;
    padding: 30px 40px;

    .post-area {

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

    .post-area-children {
        margin-top: 10px;

        textarea {
            width: 100%;
            height: 100px;
            border-radius: 5px;
            outline: none;
            padding: 10px;
            resize: none;
            border-color: @theme-color;
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;

        button {
            border-radius: 5px;
            padding: 5px 20px;
            border: 1px solid @theme-color-shallow;
            background-color: @theme-color-shallow;
            cursor: pointer;
            color: white;
        }

        button.active {
            background-color: @theme-color;
            border-color: @theme-color;
        }

        .tip {
            color: red;
            font-size: 14px;
        }

        .tip-active {
            animation: tip 0.6s;
        }
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

        .children {
            background-color: rgb(248, 248, 248);
            margin-top: 1em;
            border-radius: 5px;
            padding-left: 1em;
            padding-right: 1em;
        }
    }
}

.comment {
    display: flex;
    padding: 1em 0;

    img {
        border-radius: 50%;
    }

    .content {
        margin-left: 20px;
        flex-grow: 1;

        .nickname {
            display: flex;
            align-items: center;

            a {
                transition: @transition-time;
            }

            a:hover {
                color: @theme-color;
            }

            i {
                display: inline-block;
                border: 6px solid;
                border-radius: 3px;
                border-top-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
                margin: 0 10px;
            }
        }

        >p {
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