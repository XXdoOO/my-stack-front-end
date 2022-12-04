import axios from "@/util/request"


axios.myRequest = {
    login(username, password) {
        return axios.post(`/login?username=${username}&password=${password}`)
    },
    register(username, password) {
        return axios.post(`/register?username=${username}&password=${password}`)
    },
    logout() {
        return axios.get("/user/logout")
    },
    getBlogList(keywords, startIndex, pageSize) {
        if (keywords !== null) {
            return axios.get(`/getBlogByKeywords?keywords=${keywords}&startIndex=${startIndex}&pageSize=${pageSize}`)
        }
        return axios.get(`/getBlogByKeywords?startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getUserInfo(username) {
        return axios.get(`/getUserInfo?username=${username}`)
    },
    getUserPostBlogList(username, startIndex, pageSize) {
        return axios.get(`/getUserPostBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getUserUpBlogList(username, startIndex, pageSize) {
        return axios.get(`/getUserUpBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getUserDownBlogList(username, startIndex, pageSize) {
        return axios.get(`/getUserDownBlogList?username=${username}&startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getMyInfo() {
        return axios.get(`user/getMyInfo`)
    },
    getMyPostList(status, startIndex, pageSize) {
        if (status === null) {
            return axios.get(`user/getMyPostList?startIndex=${startIndex}&pageSize=${pageSize}`)
        }
        return axios.get(`user/getMyPostList?status=${status}&startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getMyStarList(startIndex, pageSize) {
        return axios.get(`/user/getMyStarList?startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getMyUpList(startIndex, pageSize) {
        return axios.get(`/user/getMyUpList?startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getMyDownList(startIndex, pageSize) {
        return axios.get(`/user/getMyDownList?startIndex=${startIndex}&pageSize=${pageSize}`)
    },
    getBlogDetails(blogId) {
        return axios.get(`/getBlogDetails?id=${blogId}`)
    },
    up(blogId) {
        return axios.put(`/user/upBlog?id=${blogId}`)
    },
    down(blogId) {
        return axios.put(`/user/downBlog?id=${blogId}`)
    },
    star(blogId) {
        return axios.put(`/user/starBlog?id=${blogId}`)
    },
    postComments(data) {
        return axios.post("/user/postComments", data)
    },
    upComments(commentsId) {
        return axios.put(`/user/upComments?id=${commentsId}`)
    },
    downComments(commentsId) {
        return axios.put(`/user/downComments?id=${commentsId}`)
    },
    postBlog(blog) {
        return axios.post(`/user/postBlog`, blog)
    },
    updateBlog(blog) {
        return axios.put(`/user/updateMyBlog`, blog)
    },
    deleteBlog(blogId) {
        return axios.delete(`/user/deleteMyBlog?id=${blogId}`)
    },
    deleteComments(commentsId) {
        return axios.delete(`/user/deleteMyComments?id=${commentsId}`)
    },
    getPostBlogList(blogView, orderBy, isAsc, startIndex, pageSize) {
        return axios.post(`/admin/getBlogList?orderBy=${orderBy}&isAsc=${isAsc}&startIndex=${startIndex}&pageSize=${pageSize}`, blogView)
    },
    getAuditPostDetails(blogId) {
        return axios.get(`/admin/getAuditBlogDetails?id=${blogId}`)
    },
    getUserList(user, orderBy, isAsc, startIndex, pageSize) {
        return axios.post(`/admin/getUserList?orderBy=${orderBy}&isAsc=${isAsc}&startIndex=${startIndex}&pageSize=${pageSize}`, user)
    },
    auditBlog(blogId, isPass) {
        return axios.put(`/admin/auditBlog?id=${blogId}&isPass=${isPass}`)
    },
    disableUser(username, timestamp, reason) {
        return axios.put(`/admin/disableUser?username=${username}&timestamp=${timestamp}&reason=${reason}`)
    },
    cancelDisable(username) {
        return axios.put(`/admin/cancelDisable?username=${username}`)
    },
    getWatchData() {
        return axios.get(`/admin/getWatchData`)
    },
    updateMyInfo(myInfo) {
        return axios.put(`/user/updateMyInfo`, myInfo)
    },
    deleteMy() {
        return axios.delete(`/user/deleteMy`)
    }
}

export default axios