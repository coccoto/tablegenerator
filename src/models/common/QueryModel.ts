// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type ErrorHandler from '@src/models/common/ErrorHandler'

export default class QueryModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly iniValues: {[key: string]: string}

    public constructor(sheet: Spreadsheet.Sheet, errorHandler: ErrorHandler) {

        this.sheet = sheet

        this.errorHandler = errorHandler
        this.iniValues = this.assembleIniValues()
    }

    private assembleIniValues(): {[key: string]: string} {

        const result: {[key: string]: string} = {}

        const iniSheet: Spreadsheet.Sheet = this.errorHandler.checkSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ini'))

        const range = iniSheet.getRange('A:B')
        const values = range.getValues()

        for (let i = 0; i < values.length; i ++) {

            result[values[i][0]] = values[i][1]
        }
        return result
    }

    public getIniValue(itemName: string): string {

        return this.iniValues[itemName]
    }

    public getSheetSize(): Associative {

        const toRowPoint: Spreadsheet.Range = this.sheet.getRange(this.sheet.getMaxRows(), 1)
        const toColumnPoint: Spreadsheet.Range = this.sheet.getRange(1, this.sheet.getMaxColumns())

        const sheetHeight: number = toRowPoint.getNextDataCell(SpreadsheetApp.Direction.UP).getRow()
        const sheetWidth: number = toColumnPoint.getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).getColumn()

        return {
            height: sheetHeight,
            width: sheetWidth,
        }
    }
}