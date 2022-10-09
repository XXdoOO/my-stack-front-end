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
        up(blogId) {
            if (this.blog.isUp) {
                this.blog.up--;
            } else {
                this.blog.up++;
            }

            this.blog.isUp = !this.blog.isUp;
            this.$store.dispatch('up', blogId);
        },
        down(blogId) {
            if (this.blog.isDown) {
                this.blog.down--;
            } else {
                this.blog.down++;
            }

            this.blog.isDown = !this.blog.isDown;
            this.$store.dispatch('down', blogId);
        },
        star(blogId) {
            if (this.blog.isStar) {
                this.blog.star--;
            } else {
                this.blog.star++;
            }

            this.blog.isStar = !this.blog.isStar;
            this.$store.dispatch('star', blogId);
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.$store.dispatch("refresh").then((res) => {
                vm.$store.commit("refresh", res);

                console.log(res);

                vm.axios.get(`/getBlogDetails?id=${to.query.id}`).then((res) => {
                    res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/");
                    vm.blog = res.data.data;

                    console.log(vm.$store.state);

                    if (vm.$store.state.userInfo.isLogin) {
                        const blogId = vm.blog.id;
                        const myStarList = vm.$store.state.myStarList;
                        const myUpList = vm.$store.state.myUpList;
                        const myDownList = vm.$store.state.myDownList;

                        for (const star of myStarList) {
                            if (blogId === star.id) {
                                vm.blog.isStar = true;
                            }
                        }

                        for (const up of myUpList) {
                            if (blogId === up.id) {
                                vm.blog.isUp = true;
                            }
                        }

                        for (const down of myDownList) {
                            if (blogId === down.id) {
                                vm.blog.isDown = true;
                            }
                        }

                    } else {
                        vm.blog.isStar = false;
                        vm.blog.isUp = false;
                        vm.blog.isDown = false;
                    }
                });
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