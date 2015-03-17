# coding=utf-8

import os.path
import tornado.web

class BaseHandler(tornado.web.RequestHandler):
    """docstring for BaseHandler"""
    def get_current_user(self):
        return self.get_secure_cookie("user")