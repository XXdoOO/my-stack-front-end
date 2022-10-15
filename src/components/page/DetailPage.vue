<template>
    <main class="container details">
        <div class="sidebar">
            <MyBlock :user-info="blog.authorInfo" />

            <ul class="menu">
                <li title="顶数" :class="{'up-hover': blog.isUp}">
                    <i title="顶" @click="up(blog.id)"></i>
                    <span>{{blog.up}}</span>
                </li>
                <li title="踩数" :class="{'down-hover': blog.isDown}">
                    <i title="踩" @click="down(blog.id)"></i>
                    <span>{{blog.down}}</span>
                </li>
                <li title="收藏数" :class="{'star-hover': blog.isStar}">
                    <i title="收藏" @click="star(blog.id)"></i>
                    <span>{{blog.star}}</span>
                </li>
                <li title="浏览数">
                    <i></i>
                    <span>{{blog.views}}</span>
                </li>
            </ul>

            <div id="directory" v-html="directory">

            </div>
        </div>

        <div v-html="markdownToHtml" id="markdown" ref="markdown"></div>

        <GoTop></GoTop>
    </main>
</template>
<script>
import { marked } from 'marked';
import MyBlock from "../block/MyBlock.vue"
import GoTop from "../block/GoTop.vue"

export default {
    name: "DetailPage",
    components: { MyBlock, GoTop },
    data() {
        return {
            blog: {
                content: "",
                isStar: false,
                isUp: false,
                isDown: false,
            },
            directory: null
        }
    },
    computed: {
        markdownToHtml() {
            console.log(4444)
            return marked(this.blog.content);
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
                res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/")

                this.blog = res.data.data
                this.blog.isUp = false
                this.blog.isDown = false
                this.blog.isStar = false

                console.log(this.blog)

                for (const item of this.$store.state.myStarList) {
                    if (item.id === this.blog.id) {
                        this.blog.isStar = true
                    }
                }

                for (const item of this.$store.state.myUpList) {
                    if (item.id === this.blog.id) {
                        this.blog.isUp = true
                    }
                }

                for (const item of this.$store.state.myDownList) {
                    if (item.id === this.blog.id) {
                        this.blog.isDown = true
                    }
                }
            });
        }
    },
    mounted() {
        this.createDirectory()
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (vm.$store.state.userInfo.isLogin) {
                vm.$store.dispatch("refresh").then((res) => {
                    vm.$store.commit("refresh", res)

                    vm.getBlogDetails(to.params.blogId)
                });
            } else {
                vm.getBlogDetails(to.params.blogId)
            }
        });
    }
}
</script>
<style lang="less">
.details {
    margin: 80px auto 30px auto;

    #markdown {
        width: calc(100% - 217px);
        margin-left: auto;
        background-color: white;
        border-radius: 5px;
        min-height: 100vh;
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
</style>