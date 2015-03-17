# coding=utf-8
#-*-coding:utf-8-*- 

from db import db

class Comment(object):
    def __init__(self, cmtid, comment, author, like, unlike, status):
        self.__cmtid = cmtid
        self.__comment = comment
        self.__author = author
        self.__like = like
        self.__unlike = unlike
        self.__status = status

    @property
    def cmtid(self):
        return self.__cmtid

    @property
    def comment(self):
        return self.__comment

    @property
    def author(self):
        return self.__author

    @property
    def like(self):
        return self.__like

    @property
    def unlike(self):
        return self.unlike

    @property
    def status(self):
        return self.status
        
    @staticmethod
    def change_status(cmtid, status):
        db["comment"].find_and_modify({"_id": cmtid}, update={"$set": {"status": status}})
    
    @staticmethod
    def delete_comment_by_status():
        db["comment"].remove({"status": "0"})

    @staticmethod
    def add_like(cmtid):
        db["comment"].find_and_modify({"_id": cmtid}, {"$inc": {"like": 1}})

    @staticmethod
    def cut_like(cmtid):
        db["comment"].find_and_modify({"_id": cmtid}, {"$inc": {"like": -1}})

    @staticmethod
    def add_unlike(cmtid):
        db["comment"].find_and_modify({"_id": cmtid}, {"$inc": {"unlike": 1}})

    @staticmethod
    def cut_unlike(cmtid):
        db["comment"].find_and_modify({"_id": cmtid}, {"$inc": {"unlike": -1}})

    @staticmethod
    def insert_comment(comment, author):
        db["comment"].insert({"_id": Comment.get_next_sequence_value(), "comment": comment, "author": author, "like": 0, "unlike": 0, "status": 1});
    
    @staticmethod
    def get_comment_by_cmtid(cmtid):
        item = db["comment"].find_one({"_id": cmtid})
        return Comment(cmtid, item["comment"], item["author"], item["like"], item["unlike"], item["status"])

    @staticmethod
    def get_next_sequence_value():
        doc = db['cmtcounters'].find_and_modify({"_id": "product"}, update={"$inc":{"seqcount": 1}}, upsert=True)
        return doc['seqcount']