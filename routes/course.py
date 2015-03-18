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
        keyword = self.get_argument('keyword', None)
        if keyword:
            results = Course.get_courses_by_keyword(keyword)
            categories = sum_of_categories(results)
            self.render('result.html',
                keyword=keyword,
                categories=categories,
                results=results
                )


    def post(self):
        keyword = self.get_argument('keyword', None)
        if keyword:
            results = Course.get_courses_by_keyword(keyword)
            res = {"all": []}
            for i in results:
                res["all"].append({
                    "name": i.name,
                    "teacher": i.teacher,
                    "category": i.category
                    })
            json_str = json.dumps(res, ensure_ascii=False)
            self.write(json_str)

def sum_of_categories(courses):
    categories = [0, 0, 0, 0, 0]
    for i in courses:
        categories[i.category-1]++
    return categories

class DetailHandler(BaseHandler):
    def get(self, category, teacher, name):
        res = Course.get_course_by_cate_teac_name(category, teacher, name)
        if res:
            self.render('detail.html',
                course=res
                )
        else:
            self.render('404.html')
        

    def post(self):
        pass

class RemoveCourseHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        Course.delete_course_by_status()

    def post(self):
        pass

class DeleteCourseHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cid = self.get_argument('cid', None)
        if cid:
            Course.change_status(cid, 0)

    def post(self):
        pass

class UndoDeleteCourseHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        cid = self.get_argument('cid', None)
        if cid:
            Course.change_status(cid, 1)

    def post(self):
        pass

class AddCourseHandler(BaseHandler):
    def get(self):
        self.render('add.html',
            head='添加课程'
            )

    def post(self):
        title = self.get_argument('title', None)
        teacher = self.get_argument('teacher', None)
        category = self.get_argument('category', None)
        comment = self.get_argument('comment', None)
        author = self.get_argument('author', None)
        step = self.get_argument('step', None)
        if title and teacher and category and comment and author:
            res = Course.get_course_by_name(title)
            if res and step == 1:
                result = {"all": []}
                for i in res:
                    result["all"].append({
                        "name": i.name,
                        "teacher": i.teacher,
                        "category": i.category
                        })
                json_str = json.dumps(result, ensure_ascii=False)
                self.write(json_str)
            else:
                cid = Course.insert_course({
                    "name": title,
                    "teacher": teacher,
                    "category": category
                    })
                Course.add_comment(cid, comment, author)
                self.write("1")
        else:
            self.write("0")




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
