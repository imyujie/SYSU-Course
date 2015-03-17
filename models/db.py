# coding=utf-8
#-*-coding:utf-8-*- 

import pymongo

conn = pymongo.Connection("localhost", 27017)
db = conn['forcourse']