// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from "@src/models/common/ErrorHandler"
import HeaderModel from "@src/models/HeaderModel"
import TableOperationModel from "@src/models/TableOperationModel"

export default class ReflectionModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly headerModel: HeaderModel
    private readonly tableOperationModel: TableOperationModel

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
        this.headerModel = new HeaderModel(this.sheet, this.errorHandler)
        this.tableOperationModel = new TableOperationModel(this.sheet)
    }

    public main(workTableNum: number, workTableIniPosition: Associative, workTableSize: Associative, optionWorkTableIniPosition: Associative): void {

        const selectOptionWorkTable = [optionWorkTableIniPosition.row, optionWorkTableIniPosition.column, workTableSize.height, (workTableSize.width * 2)] as const
        const optionWorkTable: Spreadsheet.Range = this.sheet.getRange(...selectOptionWorkTable)

        const allWorkTableWidth: number = workTableNum * workTableSize.width
        const fromOptionWorkTableColumnPosition: number = allWorkTableWidth + workTableIniPosition.column

        this.tableOperationModel.moveAddress(optionWorkTable, 1, fromOptionWorkTableColumnPosition)

        const selectWorkTable = [workTableIniPosition.row, workTableIniPosition.column, workTableSize.height, workTableSize.width] as const
        const workTable: Spreadsheet.Range = this.sheet.getRange(...selectWorkTable)

        const headerItems: string[][] = this.headerModel.getHeaderItems()

        this.pushWorkTable(workTable, headerItems, workTableNum, workTableSize.width, workTableIniPosition.column)
    }

    private pushWorkTable(workTable: Spreadsheet.Range, headerItems: string[][], workTableNum: number, workTalbeWidth: number, currentColumn: number, currentCount: number = 1): void {

        this.errorHandler.checkInfiniteLoop(currentCount)

        if (workTableNum < currentCount) {
            return
        }
        this.tableOperationModel.duplicateAddress(workTable, 1, currentColumn)
        this.decorateHeader(headerItems, workTalbeWidth, currentColumn, currentCount)

        currentColumn = currentColumn + workTalbeWidth
        currentCount ++

        return this.pushWorkTable(workTable, headerItems, workTableNum, workTalbeWidth, currentColumn, currentCount)
    }

    private decorateHeader(headerItems: string[][], workTalbeWidth: number, currentColumn: number, currentCount: number): void {

        const headerRange: Spreadsheet.Range = this.sheet.getRange(1, currentColumn, 1, workTalbeWidth)
        const index = currentCount - 1
        headerRange.setValue(headerItems[index][0])

        if (headerItems[index][1]) {
            const optionRange: Spreadsheet.Range = headerRange.offset(1, 0)
            this.setReverseMode(optionRange, workTalbeWidth)
        }
        
    }

    private setReverseMode(targetRange: Spreadsheet.Range, workTalbeWidth: number): void {

        const targetColors: string[][] = targetRange.getBackgrounds()
        const index = workTalbeWidth - 1
        const mainColor: string = targetColors[0][index]
        targetRange.setBackground(mainColor)
    }
}