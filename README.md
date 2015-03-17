##SYSU-Course
###依赖

* Python 2.7
* Tornado 3.0
* MongoDB
* NodeJS 开发环境
* Grunt
* BrowserifyJS
* TmodJS
* SASS

##文件结构说明
###public
前端静态资源，SASS、JS 以及编译过的 css、js，字体等
###routes
路由，各种 Handler
###templates
模板，其中里面的 modules 为 UI 模块
###models
数据库操作，包括 Course 类和 Comment 类
###urls.py
url 对应 Hanlder
###server.py
启动本地服务器
###app.py
Tornado 相关配置