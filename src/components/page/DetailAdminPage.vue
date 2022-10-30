<template>
    <div class="details">
        <div class="sidebar">
            <MyBlock :user-info="blog.authorInfo" />

            <div class="menu">
                <el-button type="success" plain icon="el-icon-success" @click="pass(true)">通过</el-button>
                <el-button type="danger" plain icon="el-icon-error" @click="pass(false)">不通过</el-button>
                <el-button type="primary" plain icon="el-icon-arrow-left" @click="getNearBlogDetails(false)">上一篇
                </el-button>
                <el-button type="primary" plain @click="getNearBlogDetails(true)">下一篇<i
                        class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </div>

            <div id="directory" v-html="directory">

            </div>
        </div>

        <div>
            <div v-html="markdownToHtml" id="markdown" ref="markdown"></div>
        </div>

        <GoTop></GoTop>
    </div>
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
                authorInfo: {
                    avatar: ""
                },
            },
            directory: null,
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
            this.$axios.myRequest.getAuditPostDetails(blogId).then((res) => {
                res.data.data.content = res.data.data.content.replace(/\\u002F/g, "/")

                this.blog = res.data.data
            });
        },
        getNearBlogDetails(isNext) {
            this.$axios.myRequest.getNearBlogDetails(this.blog.id, isNext).then((res) => {
                this.blog = res.data.data
            })
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
    width: 100%;

    #markdown {
        margin-left: 217px;
        background-color: white;
        border-radius: 5px;
        padding: 30px;
    }
}

.sidebar {
    position: fixed;
    width: 210px;
}

.menu {
    // box-sizing: border-box;
    margin-top: 5px;
    background-color: white;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 5px;
    grid-row-gap: 15px;
    padding: 10px;

    button {
        margin: 0;
        width: 93px;
    }
}
</style>