<template>
    <main class="container details">
        <div class="sidebar">
            <MyBlock />

            <ul class="menu">
                <li title="顶数">
                    <i title="顶" @click="up()"></i>
                    <span>{{blog.up}}</span>
                </li>
                <li title="踩数">
                    <i title="踩" @click="down()"></i>
                    <span>{{blog.down}}</span>
                </li>
                <li title="收藏数">
                    <i title="收藏" @click="star()"></i>
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
                content: ""
            }
        }
    },
    computed: {
        markdownToHtml() {
            return marked(this.blog.content);
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.axios.get(`/getBlogDetails?id=${to.query.id}`).then((res) => {
                res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/");
                vm.blog = res.data.data;
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

    li:first-child i:hover,
    li:nth-child(2) i:hover {
        background-image: url(../../assets/img/up-hover.png);
    }

    li:nth-child(2) i {
        background-image: url(../../assets/img/up.png);
        transform: rotate(180deg);
    }

    li:nth-child(3) i {
        background-image: url(../../assets/img/star.png);
    }

    li:nth-child(3) i:hover {
        background-image: url(../../assets/img/star-hover.png);
    }

    li:nth-child(4) i {
        background-image: url(../../assets/img/views.png);
    }
}
</style>