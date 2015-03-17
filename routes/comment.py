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
            self.redirect('/admin/all')

    def post(self):
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
            self.redirect('/admin/all')

    def post(self):
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
            self.redirect('/admin/all')

    def post(self):
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
            self.redirect('/admin/all')

    def post(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.cut_unlike(int(cmtid))
            self.write("1")
        else:
            self.write("0")

class DeleteCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.change_status("cmtid", 0)
            self.redirect('/admin/all')

    def post(self):
        pass

class UndoDeleteCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cmtid = self.get_argument("cmtid", None)
        if cmtid:
            Comment.change_status("cmtid", 1)
            self.redirect('/admin/all')

    def post(self):
        pass

class RemoveCommentHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        Comment.delete_comment_by_status()
        self.redirect('/admin/all')

    def post(self):
        pass