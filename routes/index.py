# coding=utf-8

import os.path
import tornado.web
import hashlib

from models.comments import Comment
from models.courses import Course
from base import BaseHandler

class IndexHandler(BaseHandler):
    def get(self):
        self.render('index.html')

class HTTP404Error(BaseHandler):
    def get(self):
        self.render('404.html')

class SigninHandler(BaseHandler):
    """docstring for SigninHanlder"""
    def get(self):
        self.render("signin.html")

    def post(self):
        uid = self.get_argument("uid")
        pwd = self.get_argument("pwd")
        pwd_md5 = hashlib.md5(pwd.encode('utf-8')).hexdigest()
        data = [{'uid': 'liyj29', 'pwd': '7aaffb04e4ec4b197987bb2b9439f15d'},{'uid':'13331161', 'pwd': 'b52fd7a12e13399c4eb786f6f94370f1'}];
        for dt in data:
            if dt['uid'] == uid and dt['pwd'] == pwd_md5:
                self.set_secure_cookie("user", uid)
                break

        self.redirect("/signin")

class SignoutHandler(BaseHandler):
    """docstring for SignoutHanler"""
    @tornado.web.authenticated
    def get(self):
        self.clear_cookie("user")
        self.redirect("/signin")

class ListAllCoursesHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        courses = Course.get_all_courses()
        self.render('listall.html', courses=courses)

class AdminHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('admin.html')

