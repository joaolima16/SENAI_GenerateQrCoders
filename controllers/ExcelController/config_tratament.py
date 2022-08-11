import json
class Config_Tratament:
    def configsObject(self):
        file = open("excel_config.json",'r')
        return json.load(file)