# coding=utf-8

import os.path
import tornado.web
import json
import sys
reload(sys)
sys.setdefaultencoding('utf8')

from models.comments import Comment
from models.courses import Course
from base import BaseHandler

class SearchHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        pass

class DetailHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        pass

class RemoveCourseHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        pass

class DeleteCourseHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        pass

class AddCourseHandler(BaseHandler):
    def get(self):
        pass

    def post(self):
        pass

class ExportHanlder(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        courses = Courses.get_all_courses()
        adict = {'all': []}
        
        for item in courses:
            item_dict = {'cid': item.cid, 'name': item.name, 'category': item.get_category_name(), 'teacher': item.teacher, 'count': item.count, 'comments': [], 'sums': item.sums, 'rating': item.get_rating()}
            alist = []
            for cmt in item.get_all_comments():
                item_dict["comments"].append({'cmtid': cmt.cmtid, 'content': cmt.comment, 'author': cmt.author, 'like': cmt.like, 'unlike': cmt.unlike})
            adict['all'].append(item_dict)
        json_str = json.dumps(adict, ensure_ascii=False)
        self.render('export.html', data=json_str, page_title="export")
