// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@src/models/common/QueryModel'

export default class DateTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
    }

    public bundleTableDate(): {[key: string]: number} {

        const tableDate: {[key: string]: number} = this.fetchTableDate()
        const endOfMonth: number = this.endOfMonth(tableDate)

        tableDate.endOfMonth = endOfMonth
        return tableDate
    }

    private fetchTableDate(): {[key: string]: number} {

        const dataTableWidth: number = this.getDateTableWidth()
        const dateRange: Spreadsheet.Range = this.sheet.getRange(1, 1, 1, dataTableWidth)
        const dateValues: string[][] = dateRange.getValues()

        return {
            year: Number('20' + dateValues[0][0]),
            month: Number(dateValues[0][1])
        }
    }

    private endOfMonth(tableDate: {[key: string]: number}): number {

        const date = new Date(tableDate.year, tableDate.month - 1, 0)
        return date.getDate()
    }

    public getDateWeekTable(fromRowPosition: number, height: number): Spreadsheet.Range {

        const dataTableWidth: number = this.getDateTableWidth()
        return this.sheet.getRange(fromRowPosition, 1, height, dataTableWidth)
    }

    private getDateTableWidth(): number {

        const fromWorkColumnPosition: number = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))
        return fromWorkColumnPosition - 1
    }

    public isCreated(): boolean {

        const fromWorkRowPosition: number = Number(this.queryModel.getIniValue('fromWorkRowPosition'))
        const enterDateRowPosition: number = fromWorkRowPosition + 1
    
        const value = this.sheet.getRange(enterDateRowPosition, 1).getValue()

        if (value === '') {
            return true
        }
        return false
    }
}