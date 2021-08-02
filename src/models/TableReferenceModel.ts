// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@src/models/common/QueryModel'

export default class TableReferenceModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
    }

    public bundleIniValues(): {[key: string]: number} {

        const bottomHeight: number = Number(this.queryModel.getIniValue('bottomHeight'))
        const weekRule: number = Number(this.queryModel.getIniValue('createTableWeekRule'))
        const workTableNum: number = Number(this.queryModel.getIniValue('tableHeaderItemNum'))

        return {
            bottomHeight: bottomHeight,
            weekRule: weekRule,
            workTableNum: workTableNum,
        }
    }

    public selectTable(row: number, column: number, height: number = 1, width: number = 1): Spreadsheet.Range {

        return this.sheet.getRange(row, column, height, width)
    }

    public insertRecord(targetRow: number, addNum: number): void {

        this.sheet.insertRowsBefore(targetRow, addNum)
    }

    public setValues(targetRange: Spreadsheet.Range, values: string[][] ): void {

        targetRange.setValues(values)
    }
}