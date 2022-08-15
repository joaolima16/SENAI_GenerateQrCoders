import json
class JSON_Tratament:
    def createJSON(self, arrData): 
        return json.dumps({"codes" : arrData})