// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import type QueryModel from '@src/models/common/QueryModel'
import DateTableModel from '@src/models/DateTableModel'
import TableOperateModel from "@src/models/TableOperateModel"

export default class AssembleModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly queryModel: QueryModel
    private readonly dateTableModel: DateTableModel
    private readonly tableOperateModel: TableOperateModel

    public constructor(sheet: Spreadsheet.Sheet, queryModel: QueryModel) {

        this.sheet = sheet

        this.queryModel = queryModel
        this.dateTableModel = new DateTableModel(this.sheet, this.queryModel)
        this.tableOperateModel = new TableOperateModel(this.sheet)
    }

    public main(sheetSize: Associative, tableDateInfo: Associative, bottomHeight: number): string[][] {

        const targetTable: Spreadsheet.Range = this.getTargetTable(sheetSize, bottomHeight)
        return this.assemble(targetTable, tableDateInfo, targetTable.getRow())
    }

    private getTargetTable(sheetSize: Associative, bottomHeight: number): Spreadsheet.Range {

        const fromTargetTableRowPosition: number = sheetSize.height - 1
        const toTargetTableRowPosition: number = sheetSize.height + bottomHeight
        const targetTableHeight: number = toTargetTableRowPosition - fromTargetTableRowPosition + 1

        const selectTargetTable = [fromTargetTableRowPosition, 1, targetTableHeight, sheetSize.width] as const
        return this.sheet.getRange(...selectTargetTable)
    }

    private assemble(currentTargetTable: Spreadsheet.Range, tableDateInfo: Associative, currentRow: number, currentDate: number = 1, dateValues: string[][] = []): string[][] {

        if (tableDateInfo.endOfMonth < currentDate) {
            this.tableOperateModel.deleteAddress(currentRow)
            return dateValues
        }

        const currentWeekIndex: number = this.dateTableModel.getWeekIndex(tableDateInfo.year, tableDateInfo.month, currentDate)
        
        if (this.canInsert(tableDateInfo, currentWeekIndex)) {
            currentRow ++

            this.tableOperateModel.duplicateAddress(currentTargetTable, currentRow, 1)
            currentTargetTable = currentTargetTable.offset(1, 0)

            dateValues.push([String(currentDate)])
        }
        currentDate ++

        return this.assemble(currentTargetTable, tableDateInfo, currentRow, currentDate, dateValues)
    }

    private canInsert(tableDateInfo: Associative, currentWeekIndex: number): boolean {

        if (tableDateInfo.weekRule === 0 || tableDateInfo.weekRule === currentWeekIndex) {
            return true
        }
        return false
    }
}