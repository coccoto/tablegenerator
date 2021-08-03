// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from "@src/models/common/ErrorHandler"
import TableOperateModel from "@src/models/TableOperateModel"

export default class ReflectionModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly tableOperateModel: TableOperateModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.tableOperateModel = new TableOperateModel(this.sheet)
    }

    public main(workTableNum: number, workTableIniPosition: Associative, workTableSize: Associative, optionWorkTableIniPosition: Associative): void {

        const selectOptionWorkTable = [optionWorkTableIniPosition.row, optionWorkTableIniPosition.column, workTableSize.height, (workTableSize.width * 2)] as const
        const optionWorkTable: Spreadsheet.Range = this.sheet.getRange(...selectOptionWorkTable)

        const allWorkTableWidth: number = workTableNum * workTableSize.width
        const fromOptionWorkTableColumnPosition: number = allWorkTableWidth + workTableIniPosition.column

        this.tableOperateModel.moveAddress(optionWorkTable, 1, fromOptionWorkTableColumnPosition)

        const selectWorkTable = [workTableIniPosition.row, workTableIniPosition.column, workTableSize.height, workTableSize.width] as const
        const workTable: Spreadsheet.Range = this.sheet.getRange(...selectWorkTable)

        this.pushWorkTable(workTable, workTableNum, workTableSize.width, workTableIniPosition.column)
    }

    private pushWorkTable(workTable: Spreadsheet.Range, workTableNum: number, workTalbeWidth: number, currentColumn: number, currentCount: number = 1): void {

        this.errorHandler.checkInfiniteLoop(currentCount)

        if (workTableNum < currentCount) {
            return
        }
        this.tableOperateModel.duplicateAddress(workTable, 1, currentColumn)

        currentColumn = currentColumn + workTalbeWidth
        currentCount ++

        return this.pushWorkTable(workTable, workTableNum, workTalbeWidth, currentColumn, currentCount)
    }
}