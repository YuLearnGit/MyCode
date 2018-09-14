from flask import jsonify,url_for

class MainCon:
    def getPageUrl(self,form):
        pagename = form["page"]
        msg = dict()
        msg["page"] = "/%s"%pagename #url_for(pagename)
        return jsonify(msg)
