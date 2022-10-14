import Vue from 'vue';
import VueRouter from "vue-router";
import IndexPage from "../components/page/IndexPage";
import DetailPage from "../components/page/DetailPage";
import MyPage from "../components/page/MyPage";
import SearchPage from "../components/page/SearchPage";
import EditPage from "../components/page/EditPage";
import AdminPage from "../components/page/AdminPage";
import UserPage from "../components/page/UserPage";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", meta: { title: "首页" }, component: IndexPage },
        { path: "/top", meta: { title: "热门" }, component: MyPage },
        { path: "/my", meta: { title: "个人主页" }, component: MyPage },
        { path: "/user", meta: { title: "用户主页" }, component: UserPage },
        { path: "/details", meta: { title: "详情" }, component: DetailPage },
        { path: "/edit", meta: { title: "编辑" }, component: EditPage },
        { path: "/search", meta: { title: "搜索" }, component: SearchPage },
        { path: "/admin", meta: { title: "管理页面" }, component: AdminPage },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    next();
})

export default router;