// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@/models/common/QueryModel'

export default class DateTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
    }

    public bundleTableDate(): Associative {

        const tableDate: Associative = this.fetchTableDate()
        const endOfMonth: number = this.endOfMonth(tableDate)

        tableDate.endOfMonth = endOfMonth
        return tableDate
    }

    private fetchTableDate(): Associative {

        const dataTableWidth: number = this.getDateTableWidth()
        const dateRange: Spreadsheet.Range = this.sheet.getRange(1, 1, 1, dataTableWidth)
        const dateValues: string[][] = dateRange.getValues()

        return {
            year: Number('20' + dateValues[0][0]),
            month: Number(dateValues[0][1])
        }
    }

    private endOfMonth(tableDate: Associative): number {

        const date = new Date(tableDate.year, tableDate.month, 0)
        return date.getDate()
    }

    private getDateTableWidth(): number {

        const fromWorkColumnPosition: number = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))
        const toDateTableColumnPosition: number = fromWorkColumnPosition - 1
        return toDateTableColumnPosition
    }

    public getWeekIndex(targetYear: number, targetMonth: number, targetDate: number): number {

        const date = new Date(targetYear, targetMonth - 1, targetDate)
        return date.getDay() + 1
    }

    public getDateWorkTableIniPosition(): Associative {

        const fromDateWorkRowPosition = Number(this.queryModel.getIniValue('fromDateWorkRowPosition'))
        const fromDateWorkColumnPosition = Number(this.queryModel.getIniValue('fromDateWorkColumnPosition'))

        return {
            row: fromDateWorkRowPosition,
            column: fromDateWorkColumnPosition,
        }
    }

    public decorateDateValue(targetDateValues: string[][]): void {

        const dateWorkTableIniPosition: Associative = this.getDateWorkTableIniPosition()
        const selectDateWorkTable = [dateWorkTableIniPosition.row, dateWorkTableIniPosition.column, targetDateValues.length, 1] as const
        const dateWorkTable: Spreadsheet.Range = this.sheet.getRange(...selectDateWorkTable)
        dateWorkTable.setValues(targetDateValues)
    }
}