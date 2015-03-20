# coding=utf-8

import os.path
import tornado.web

from models.comments import Comment
from models.courses import Course
from base import BaseHandler

class AddLikeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.add_like(int(cmtid))
            self.redirect('/admin')

    def post(self):
        userip = self.request.remote_ip
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.add_like(int(cmtid))
            self.write("1")
        else:
            self.write("0")

class CutLikeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.cut_like(int(cmtid))
            self.redirect('/admin')

    def post(self):
        userip = self.request.remote_ip
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.cut_like(int(cmtid))
            self.write("1")
        else:
            self.write("0")

class AddUnlikeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.add_unlike(int(cmtid))
            self.redirect('/admin')

    def post(self):
        userip = self.request.remote_ip
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.add_unlike(int(cmtid))
            self.write("1")
        else:
            self.write("0")

class CutUnlikeHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.cut_unlike(int(cmtid))
            self.redirect('/admin')

    def post(self):
        userip = self.request.remote_ip
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.cut_unlike(int(cmtid))
            self.write("1")
        else:
            self.write("0")

class AddCommentHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        comment = self.get_argument("content", None)
        author = self.get_argument("author", None)
        rating = self.get_argument("rating", None)
        cid = self.get_argument("cid", None)
        if comment and author and rating and cid:
            cmtid = Course.add_comment(int(cid), comment, author)
            Course.add_rating(int(cid), int(rating))
            self.write(str(cmtid))
        else:
            self.write("-1")

class DeleteCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.change_status(int(cmtid), 0)
            self.write('1')

    def post(self):
        pass

class UndoDeleteCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.change_status(int(cmtid), 1)
            self.write('1')

    def post(self):
        pass

class RemoveCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        Comment.delete_comment_by_status()
        self.redirect('/admin')

    def post(self):
        pass

