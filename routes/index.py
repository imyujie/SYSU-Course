# coding=utf-8

import os.path
import tornado.web
import hashlib

import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')

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
        courses = Course.get_all_courses()
        self.render('admin.html',
            courses=courses,
            )
    @tornado.web.authenticated
    def post(self):
        cid = self.get_argument('cid', None)
        if cid:
            comments = Course.get_all_comments(cid)
            a = []
            for i in comments:
                a.append({
                    'cmtid': i.cmtid,
                    'author': i.author,
                    'content': i.comment,
                    'like': i.like,
                    'unlike': i.unlike,
                    'status': i.status
                    })
            b = {
            'all': a
            }
            json_str = json.dumps(b, ensure_asii = False)
            self.write(json_str)
        else:
            self.write('0')

class UpdateHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cid = self.get_argument('cid')
        cmtid = self.get_argument('cmtid')
        if cid:
            course = Course.get_course_by_cid(cid)
            self.render('updateCourse.html',
                course=course
                )
        if cmtid:
            comment = Comment.get_comment_by_cmtid(cmtid)
            self.render('updateComment.html',
                comment=comment
                )


