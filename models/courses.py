# coding=utf-8
#-*-coding:utf-8-*- 

from db import db
from Comment import Comment

class Course(object):
    """ Course Infomations
        @param cid {num} The unique ID of the course.
        @param name {string} The name of the course.
        @param teacher {string} The teacher of the course.
        @param category {num} The number of category of the course. 
                1: General Electives
                2: Subject Electives
                3: General Requisites
                4: Subject Requisites
                5: PE Class
        @param cmtid {list} The comments id of the course.
        @param status {num} Replace the visibility of the course.
                0: Deleted. (But still save in DataBase)
                1: Visible.
        @param count {num} The number of people given ratings.
        @param sums {num} The total number of ratings.
    """
    def __init__(self, cid, name, teacher, category, cmtids, status, count, sums):
        self.__cid = cid
        self.__name = name
        self.__teacher = teacher
        self.__category = category
        self.__cmtids = cmtids
        self.__status = status
        self.__count = count
        self.__sums = sums

    @property
    def cid(self):
        return self.__cids

    @property
    def name(self):
        return self.__name

    @property
    def teacher(self):
        return self.__teacher

    @property
    def category(self):
        return self.__category

    @property
    def cmtids(self):
        return self.__cmtids

    @property
    def status(self):
        return self.__status

    @property
    def count(self):
        return self.__count

    @property
    def sums(self):
        return self.__sums

    def get_category_name(self):
        names = ["公选", "专选", "公必", "专必", "体育"]
        return names[self.category - 1]

    def get_comments(self):
        alist = []
        for i in self.cmtids:
            alist.append(Comment.get_comment_by_cmtid(i))
        return alist

    def get_rating(self):
        return self.sums/self.count

    @staticmethod
    def insert_course(info):
        """
            _id: cid,
            count: The number of people given a rate.
            sum: The total number of rate.
        """
        db["course"].insert({
            "_id": Course.get_next_sequence_value(),
            "teacher": info.teacher,
            "name": info.name,
            "category": info.category,
            "status": 1,
            "cmtids": [],
            "count": 0,
            "sum": 0
        })

    @staticmethod
    def update_course(info):
        db["course"].find_and_modify(
            {"_id": info.cid},
            update={"$set": {
                "teacher": info.teacher,
                "name": info.name,
                "category": info.category
            }}
        )

    @staticmethod
    def change_status(cid, status):
        db["course"].find_and_modify(
            {"_id": cid}, 
            update={"$set": {
                "status": status
            }}
        )

    @staticmethod
    def add_comment(cid, comment, author):
        cmtid = Comment.insert_comment(comment, author)
        item = db["course"].find_one({"_id": cid})
        alist = item["cmtids"]
        alist.append(cmtid)
        db["course"].find_and_modify(
            {"_id": cid},
            update={
                "$set":{
                    "cmtids": alist
                }
            }
        )

    @staticmethod
    def add_rating(cid, rating):
        db["course"].find_and_modify(
            {"_id": cid},
            update={
                "$inc":{
                    "count": 1,
                    "sums": rating
                }
            }
        )

    @staticmethod
    def delete_course(cid):
        db["course"].remove({"_id": cid})

    @staticmethod
    def delete_course_by_status():
        db["course"].remove({"status": "0"})

    @staticmethod
    def get_course_by_cid(cid):
        item = db["course"].find_one({"_id", cid})
        return Course(item["_id"], item["name"], item["teacher"], item["category"], item["cmtids"], item["status"], item["count"], item["sums"])

    @staticmethod
    def get_all_courses():
        items = db["course"].find()
        items_list = []
        for item in items:
            items_list.append(Course(item["_id"], item["name"], item["teacher"], item["category"], item["cmtids"], item["count"], item["sums"]))
        return items_list

    @staticmethod
    def get_course_by_cate_teac_name(cate, teac, name):
        item = db["course"].find_one({
            "category": cate,
            "teacher": teac,
            "name": name
        })
        return  Course(item["_id"], item["name"], item["teacher"], item["category"], item["cmtids"], item["status"], item["count"], item["sums"])

    @staticmethod
    def get_course_by_name(name):
        item = db["course"].find({"name": name})
        alist = []
        if item:
            for it in item:
                alist.append(Course(item["_id"], item["name"], item["teacher"], item["category"], item["cmtids"], item["count"], item["sums"]))
            return alist
        return False

    @staticmethod
    def get_next_sequence_value():
        doc = db['counters'].find_and_modify({"_id": "product"}, update={"$inc":{"seqcount": 1}}, upsert=True)
        return doc['seqcount']

    @staticmethod
    def get_courses_by_keyword(keyword):
        items = db["course"].find()
        items_list = []
        for item in items:
            if item.name.find(keyword) > -1 or item.teacher.find(keyword) > -1:
                items_list.append(Course(item["_id"], item["name"], item["teacher"], item["category"], item["cmtids"], item["count"], item["sums

        return items_list