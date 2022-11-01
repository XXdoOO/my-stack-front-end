import Vue from 'vue';
import VueRouter from "vue-router";
import IndexPage from "../components/page/IndexPage";
import DetailPage from "../components/page/DetailPage";
import MyPage from "../components/page/MyPage";
import SearchPage from "../components/page/SearchPage";
import EditPage from "../components/page/EditPage";
import AdminPage from "../components/page/AdminPage";
import UserPage from "../components/page/UserPage";
import DetailAdminPage from "../components/page/DetailAdminPage";
import Login from "../components/login"
import AuditList from "../components/block/AuditList.vue"
import UserList from "../components/block/UserList.vue"

Vue.use(Login);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", meta: { title: "首页" }, component: IndexPage },
        { path: "/top", meta: { title: "热门" }, component: MyPage },
        { path: "/my/auditing", meta: { title: "审核中" }, component: MyPage },
        { path: "/my/pass", meta: { title: "审核通过" }, component: MyPage },
        { path: "/my/noPass", meta: { title: "审核不通过" }, component: MyPage },
        { path: "/my/up", meta: { title: "我顶过的博客" }, component: MyPage },
        { path: "/my/down", meta: { title: "我踩过的博客" }, component: MyPage },
        { path: "/my/star", meta: { title: "我收藏的博客" }, component: MyPage },
        { path: "/user/:username/postBlogList", meta: { title: "用户发布的博客" }, component: UserPage },
        { path: "/user/:username/upBlogList", meta: { title: "用户顶过的博客" }, component: UserPage },
        { path: "/user/:username/downBlogList", meta: { title: "用户踩过的博客" }, component: UserPage },
        { path: "/user/edit", meta: { title: "发布博客" }, component: EditPage },
        { path: "/user/edit/:blogId", meta: { title: "编辑博客" }, component: EditPage },
        { path: "/search/:keywords", meta: { title: "搜索" }, component: SearchPage },
        { path: "/details/:blogId", meta: { title: "详情" }, component: DetailPage },
        {
            path: "/admin", meta: { title: "管理后台" }, component: AdminPage, children: [
                { path: "blog/details/:blogId", meta: { title: "审核的博客详情" }, component: DetailAdminPage },
                { path: "blogList", meta: { title: "博客列表" }, component: AuditList },
                { path: "userList", meta: { title: "用户列表" }, component: UserList },
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    const identity = to.path.split("/")[1]

    console.log(identity)

    if (identity === "my") {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(userInfo)

        if (userInfo) {
            next()
        } else {
            Vue.prototype.$loginRegister.showLoginRegister()
        }
    } else if (identity === "admin") {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        console.log(userInfo)

        if (userInfo && userInfo.identity) {
            next()
        } else {
            Vue.prototype.$loginRegister.showLoginRegister()
        }
    } else {
        next()
    }
})

export default router;