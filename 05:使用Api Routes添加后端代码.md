# 05:使用Api Routes添加后端代码.md

# What are API Routes?
# Adding & Using API Routes
# Working with Requests & Response

## 发送POST请求

## 发送GET请求

## 项目的常规页面调用自己的API
- 不需要发送http请求,直接使用props
- 使用Nxet的预渲染功能获取数据之后放进props，然后页面直接取过来用


## Creating & Using Dynamic API Routes
- 使用动态路由一般是在需要进入具体id的页面，所以handler需要带参数
- 我们在调用handler的后面通过bind()绑定参数

- ## 这一步我们创建了一个动态路由
	- 但是不用来直接访问，而是在主页面获取动态路由的内容
	- 也可以给每个动态路由一个动态的页面，然后点击重定向到动态路由
- 不是所有的页面都需要有API Routes，如果页面有一些后端功能，那么就需要添加对应的API



