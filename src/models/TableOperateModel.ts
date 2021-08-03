// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableOperateModel {

    private readonly sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    public moveAddress(targetRange: Spreadsheet.Range, row: number, column: number): void {

        const address: Spreadsheet.Range = this.sheet.getRange(row, column)
        targetRange.moveTo(address)
    }

    public duplicateAddress(targetRange: Spreadsheet.Range, row: number, column: number): void {

        const address: Spreadsheet.Range = this.sheet.getRange(row, column)
        targetRange.copyTo(address)
    }

    public deleteAddress(targetRow: number): void {

        this.sheet.deleteRow(targetRow)
    }
}