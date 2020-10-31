// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableMeasure {

    private sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    public exception(i: number): void {

        if (i > 100) {
            throw new Error('TableMeasure i > 100')
        }
    }

    private hasEndPoint(row: number = 1, column: number = 1): boolean {

        let endPoint: string = this.sheet.getRange(row, column).getValue()

        if (endPoint === '-') {
            return true
        }
        return false
    }

    public width(row: number = 1, column: number = 1): number {

        this.exception(column)

        if (this.hasEndPoint(row, column)) {
            return (column - 1)
        }
        column ++
        return this.width(row, column)
    }

    public height(row: number = 1, column: number = 1): number {

        this.exception(row)

        if (this.hasEndPoint(row, column)) {
            return (row - 1)
        }
        row ++
        return this.height(row, column)
    }
}