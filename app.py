# coding=utf-8

from urls import urls

import os.path
import tornado.web
import pymongo

from routes.modules import modules

setting = dict(
    template_path=os.path.join(os.path.dirname(__file__),"templates"),
    static_path=os.path.join(os.path.dirname(__file__),"public"),
    debug=True,
    login_url = "/signin",
    cookie_secret="3e5QHNKnXe}#=#?.U>Uz.|I$T&~wtI^XoN^f<T?cEBB$|Uj$DQ",
    xsrf_cookies=True,
    ui_modules=modules
)

class Application(tornado.web.Application):
    def __init__(self):
        handlers=urls
        tornado.web.Application.__init__(self, handlers, **setting)