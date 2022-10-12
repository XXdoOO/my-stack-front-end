<template>
    <main class="container details">
        <div class="sidebar">
            <MyBlock />

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
        </div>

        <div v-html="markdownToHtml" class="markdown"></div>


    </main>
</template>
<script>
import { marked } from 'marked';
import MyBlock from "../block/MyBlock.vue"

export default {
    name: "DetailPage",
    components: { MyBlock },
    data() {
        return {
            blog: {
                content: "",
                isStar: false,
                isUp: false,
                isDown: false,
            }
        }
    },
    computed: {
        markdownToHtml() {
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
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$axios.myRequest.getBlogDetails(to.query.id).then((res) => {
                res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/")

                vm.blog = res.data.data
                vm.blog.isUp = false
                vm.blog.isDown = false
                vm.blog.isStar = false

                console.log(2222)

                for (const item of vm.$store.state.myStarList) {
                    if (item.id === vm.blog.id) {
                        vm.blog.isStar = true
                    }
                }

                for (const item of vm.$store.state.myUpList) {
                    if (item.id === vm.blog.id) {
                        vm.blog.isUp = true
                    }
                }

                for (const item of vm.$store.state.myDownList) {
                    if (item.id === vm.blog.id) {
                        vm.blog.isDown = true
                    }
                }
            });
        });
    }
}
</script>
<style lang="less">
.details {
    margin: 80px auto 30px auto;

    .markdown {
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
    margin-top: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;

    li {
        cursor: pointer;
        display: flex;
        align-items: center;

        i {
            width: 20px;
            height: 20px;
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