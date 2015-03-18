import pymongo

conn = pymongo.Connection("localhost", 27017)
db = conn['forcourse']

db['counters'].insert({"_id": "product", "seqcount": 0})
db['cmtcounters'].insert({"_id": "product", "seqcount": 0})