// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@src/models/common/QueryModel'

export default class WorkTableModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
    }

    public getIniPopsition(): {[key: string]: number} {

        const fromWorkRowPosition = 1
        const fromWorkColumnPosition = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))

        return {
            row: fromWorkRowPosition,
            column: fromWorkColumnPosition,
        }
    }

    public getSubIniPopsition(workTableIniColumnPosition: number, workTableWidth: number): {[key: string]: number} {

        const fromSubWorkRowPosition = 1
        const fromSubWorkColumnPosition = workTableIniColumnPosition + workTableWidth

        return {
            row: fromSubWorkRowPosition,
            column: fromSubWorkColumnPosition,
        }
    }

    public getWorkTableSize(bottomHeight: number): {[key: string]: number} {

        const workTableHeight: number = this.getWorkTableHeight(bottomHeight)
        const workTableWidth: number = this.getWorkTableWidth()

        return {
            height: workTableHeight,
            width: workTableWidth,
        }
    }

    private getWorkTableHeight(bottomHeight: number): number {

        const sheetSize: {[key: string]: number} = this.queryModel.getSheetSize()
        return sheetSize.height + bottomHeight
    }

    private getWorkTableWidth(): number {

        const fromWorkColumnPosition: number = Number(this.queryModel.getIniValue('fromWorkColumnPosition'))
        const toWorkColumnPosition: number = Number(this.queryModel.getIniValue('toWorkColumnPosition'))

        const workTableWidth: number = toWorkColumnPosition - fromWorkColumnPosition + 1
        return workTableWidth
    }
}