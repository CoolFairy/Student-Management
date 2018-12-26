# Express - CURD





## 起步

- 初始化
- 模板处理



## 路由设计

| 请求方法 | 请求路径         | get参数 | post参数                       | 备注             |
| -------- | ---------------- | ------- | ------------------------------ | ---------------- |
| GET      | /students        |         |                                | 渲染学生列表     |
| GET      | /students/new    |         |                                | 渲染添加学生页面 |
| POST     | /students/new    |         | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id      |                                | 渲染编辑学生页面 |
| POST     | /students/edit   |         | id、name、age、gender、hobbies | 处理编辑学生请求 |
| GET      | /students/delete | id      |                                | 处理删除学生请求 |

