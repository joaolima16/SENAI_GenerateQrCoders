from config_tratament import Config_Tratament as ct
from openpyxl import Workbook, load_workbook
from json_tratament import JSON_Tratament as jt

class Excel_Tratament:
    def main(self):
        objectConfig = ct.configsObject(None)
        excelSheet = self.__getExcelFile(objectConfig['file_name'])
        
        columnReference = self.__getColumnReference(excelSheet, objectConfig["column_codes"])
        allCodes = self.__getRowsData(excelSheet, columnReference)
        
        columnReference = self.__getColumnReference(excelSheet, objectConfig["column_names"])
        allNames = self.__getRowsData(excelSheet, columnReference)

        finalData = self.__formationData(allCodes,allNames)
        
        return jt.createJSON(None, finalData)

    @staticmethod
    def __formationData(keyArr, valueArr):
        arrFinal = []
        for i in range(len(keyArr)):
            arrFinal.append({keyArr[i]:valueArr[i]})
        return arrFinal
    
    @staticmethod
    def __getColumnReference(sheet, columnCodes):
        index = 0
        while True:
            letterColumn = chr(66-index)
            columnName = f"{letterColumn}1"
            if(sheet[columnName].value == columnCodes):
                return columnName 
            index += 1
    
    @staticmethod
    def __getRowsData(sheet, columnReference):
        arrCodes = []
        index = 2
        while True:
            rowData = sheet[f"{columnReference[0:len(columnReference)-1]}{index}"] 
            if( rowData.value == None): return arrCodes
            arrCodes.append(rowData.value)
            index += 1
    
    @staticmethod
    def __getExcelFile(fileName):
        wb = load_workbook(fileName)
        return wb.active

Excel_Tratament.main(None)