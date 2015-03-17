#!/usr/bin/env python
#coding:utf-8

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from routes.index import IndexHandler
from routes.index import HTTP404Error
from routes.index import SigninHandler
from routes.index import SignoutHandler
from routes.index import AdminHandler
from routes.index import ListAllCourseHandler

from routes.course import AddCourseHandler
from routes.course import DeleteCourseHandler
from routes.course import RemoveCourseHandler
from routes.course import DetailHandler
from routes.course import SearchHandler
from routes.course import ExportHandler

from routes.comment import AddLikeHandler
from routes.comment import AddUnlikeHandler
from routes.comment import CutLikeHandler
from routes.comment import CutUnlikeHandler
from routes.comment import AddCommentHandler
from routes.comment import DeleteCommentHandler
from routes.comment import RemoveCommentHandler


urls = [
    (r'/', IndexHandler),
    (r'/signout', SignoutHandler),
    (r'/signin', SigninHandler),
    (r'/add/like', AddLikeHandler),
    (r'/add/unlike', AddUnlikeHandler),
    (r'/cut/like', CutLikeHandler),
    (r'/cut/unlike', CutUnlikeHandler),
    (r'/add/course', AddCourseHandler),
    (r'/add/comment', AddCommentHandler),
    (r'/delete/comment', DeleteCommentHandler),
    (r'/delete/course', DeleteCourseHandler),
    (r'/remove/course', RemoveCourseHandler),
    (r'/remove/comment', RemoveCommentHandler),
    (r"/export", ExportHandler),
    (r'/search', SearchHandler),
    (r'/admin', AdminHandler),
    (r'/admin/courses', ListAllCourseHandler),
    (r'/(.*)/(.*)/(.*)', DetailHandler),

    (r'.*', HTTP404Error)
]