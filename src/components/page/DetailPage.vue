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
        getDetails(blogId, that) {
            console.log(2143124)
            that.axios.get(`/getBlogDetails?id=${blogId}`).then((res) => {
                res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/");
                that.blog = res.data.data;
                that.blog.isStar = false;
                that.blog.isUp = false;
                that.blog.isDown = false;

                for (const item of that.$store.state.myStarList) {
                    if (item.id == blogId) {
                        that.blog.isStar = true;
                    }
                }

                for (const item of that.$store.state.myUpList) {
                    if (item.id == blogId) {
                        that.blog.isUp = true;
                    }
                }

                for (const item of that.$store.state.myDownList) {
                    if (item.id == blogId) {
                        that.blog.isDown = true;
                    }
                }
            });
        },
        up(blogId) {
            this.$store.dispatch('up', {
                blogId, callback: () => {
                    this.getDetails(blogId, this);
                }
            });
        },
        down(blogId) {
            this.$store.dispatch('down', {
                blogId, callback: () => {
                    this.getDetails(blogId, this);
                }
            });
        },
        star(blogId) {
            this.$store.dispatch('star', {
                blogId, callback: () => {
                    this.getDetails(blogId, this);
                }
            });
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (vm.$store.state.userInfo.isLogin) {
                vm.$store.dispatch("refresh").then((res) => {
                    vm.$store.commit("refresh", res);

                    vm.getDetails(to.query.id, vm);
                })
            } else {
                vm.axios.get(`/getBlogDetails?id=${to.query.id}`).then((res) => {
                    res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/");
                    vm.blog = res.data.data;
                });
            }

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
    width: 210px;
    margin-top: 10px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;

    li {
        padding-right: 10px;
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