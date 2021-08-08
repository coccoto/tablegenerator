// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type ErrorHandler from '@src/models/common/ErrorHandler'

export default class HeaderModel {

    private readonly sheet: Spreadsheet.Sheet
    private readonly headerSheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler

    public constructor(sheet: Spreadsheet.Sheet, errorHandler: ErrorHandler) {

        this.sheet = sheet

        this.errorHandler = errorHandler

        this.headerSheet = this.getHeaderSheet()
    }

    private getHeaderSheet(): Spreadsheet.Sheet {

        const headerSheet: Spreadsheet.Sheet = this.errorHandler.checkSheet(SpreadsheetApp.getActiveSpreadsheet().getSheetByName('header'))
        return headerSheet
    }

    public getHeaderItems(): string[][] {

        const targetRange = this.headerSheet.getRange('A:B')
        const headerItems = targetRange.getValues()

        headerItems.shift()
        return headerItems
    }
}