import Vue from 'vue';
import VueRouter from "vue-router";
import IndexPage from "../components/page/IndexPage";
import LoginRegister from "../components/page/LoginRegister";
import DetailPage from "../components/page/DetailPage";
import PersonalPage from "../components/page/PersonalPage";
import SearchPage from "../components/page/SearchPage";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: "/", meta: { title: "首页" }, component: IndexPage },
        { path: "/top", meta: { title: "热门" }, component: PersonalPage },
        { path: "/user", meta: { title: "个人主页" }, component: PersonalPage },
        { path: "/loginRegister", meta: { title: "登录/注册" }, component: LoginRegister },
        { path: "/details", meta: { title: "详情" }, component: DetailPage },
        { path: "/search", meta: { title: "搜索" }, component: SearchPage },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    setTimeout(() => {
        next();
    }, 300);
})

export default router;