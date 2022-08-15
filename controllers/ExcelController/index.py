from config_tratament import Config_Tratament as ct
from openpyxl import Workbook, load_workbook
from json_tratament import JSON_Tratament as jt

class Excel_Tratament:
    def main(self):
        objectConfig = ct.configsObject(None)
        excelSheet = Excel_Tratament.__getExcelFile(objectConfig['file_name'])
        
        columnReference = Excel_Tratament.__getColumnReference(excelSheet, objectConfig["column_codes"])
        allCodes = Excel_Tratament.__getRowsData(excelSheet, columnReference)
        
        columnReference = Excel_Tratament.__getColumnReference(excelSheet, objectConfig["column_names"])
        allNames = Excel_Tratament.__getRowsData(excelSheet, columnReference)

        finalData = Excel_Tratament.__formationData(allCodes,allNames)
        
        print(jt.createJSON(None, finalData))

    def __formationData(codeArr, nameArr):
        arrFinal = []
        for i in range(len(codeArr)):
            arrFinal.append({'code':codeArr[i],'name':nameArr[i]})
        return arrFinal
    
    def __getColumnReference(sheet, columnCodes):
        index = 0
        while True:
            letterColumn = chr(66+index)
            columnName = f"{letterColumn}1"
            if(sheet[columnName].value == columnCodes):
                return columnName 
            index += 1
    
    def __getRowsData(sheet, columnReference):
        arrCodes = []
        index = 2
        while True:
            rowData = sheet[f"{columnReference[0:len(columnReference)-1]}{index}"] 
            if( rowData.value == None): return arrCodes
            arrCodes.append(rowData.value)
            index += 1
    
    def __getExcelFile(fileName):
        wb = load_workbook(fileName)
        return wb.active

Excel_Tratament.main(None)