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
        
        for dt in data:
            if dt['uid'] == uid and dt['pwd'] == pwd_md5:
                self.set_secure_cookie("user", uid)
                break

        self.redirect("/admin")

class SignoutHandler(BaseHandler):
    """docstring for SignoutHanler"""
    @tornado.web.authenticated
    def get(self):
        self.clear_cookie("user")
        self.redirect("/signin")

class UpdateHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cid = self.get_argument('cid', None)
        cmtid = self.get_argument('cmtid', None)
        if cid:
            course = Course.get_course_by_cid(cid)
            self.render('updateCourse.html', course=course)
        if cmtid:
            comment = Comment.get_comment_by_cmtid(cmtid)
            self.render('updateComment.html', comment=comment)

    @tornado.web.authenticated
    def post(self):
        cid = self.get_argument('cid', None)
        cmtid = self.get_argument('cmtid', None)
        if cid:
            name = self.get_argument('name', None)
            category = self.get_argument('category', None)
            status = self.get_argument('status', None)
            sums = self.get_argument('sums', None)
            count = self.get_argument('count', None)
            teacher = self.get_argument('teacher', None)
            Course.update_course({
                "cid": int(cid),
                "name": name,
                "category": int(category),
                "status": int(status),
                "sums": int(sums),
                "count": int(count),
                "teacher": teacher
                })
            self.redirect('/admin')

        if cmtid:
            author = self.get_argument('author', None)
            like = self.get_argument('like', None)
            unlike = self.get_argument('unlike', None)
            status = self.get_argument('status', None)
            comment = self.get_argument('comment', None)
            Comment.update_comment(int(cmtid), {
                "cmtid": int(cmtid),
                "author": author,
                "like": int(like),
                "unlike": int(unlike),
                "comment": comment,
                "status": int(status),
                })
            self.redirect('/admin')


class AdminHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        courses = Course.get_all_courses()
        self.render('data-base.html', courses=courses)

    @tornado.web.authenticated
    def post(self):
        cid = self.get_argument('cid', None)
        if cid:
            comments = Course.get_all_comments(cid)
            a = []
            for i in comments:
                a.append({'cmtid': i.cmtid, 'author': i.author, 'content': i.comment, 'like': i.like, 'unlike': i.unlike, 'status': i.status })
            b = {'all': a}
            json_str = json.dumps(b, ensure_asii = False)
            self.write(json_str)
        else:
            self.write('0')