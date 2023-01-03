# 技术：

- 前：vue3 vue-router pinia ts less axios element-plus vite mavon-editor
- 后：springboot mybatis-plus maven lombok kaptcha pagehelper

# 系统

## 角色及权限

- 游客
  - 查看、搜索首页博客，查看用户发布、顶过、踩过的博客
  - 查看评论
  - 登录、注册
- 普通用户
  - 包含游客所拥有的功能
  - 退出登录  
  - 发布、更新、删除博客
  - 顶、踩、收藏博客，保存浏览记录
  - 发布、删除、顶、踩评论
- 管理用户
  - 包含游客和普通用户所拥有的功能
  - 审核博客
  - 封禁、解封用户
