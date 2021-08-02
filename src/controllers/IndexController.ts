// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@src/models/common/ErrorHandler'
import QueryModel from '@src/models/common/QueryModel'
import AssembleModel from '@src/models/AssembleModel'
import DateTableModel from '@src/models/DateTableModel'
import TableReferenceModel from '@src/models/TableReferenceModel'
import WorkTableModel from '@src/models/WorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly assembleModel: AssembleModel
    private readonly dateTableModel: DateTableModel
    private readonly tableReferenceModel: TableReferenceModel
    private readonly workTableModel: WorkTableModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.sheet, this.errorHandler)
        this.assembleModel = new AssembleModel(this.sheet)
        this.dateTableModel = new DateTableModel(this.sheet, this.queryModel)
        this.tableReferenceModel = new TableReferenceModel(this.sheet, this.queryModel)
        this.workTableModel = new WorkTableModel(this.sheet, this.queryModel)
    }

    public main(): void {

        const iniValues: {[key: string]: number} = this.tableReferenceModel.bundleIniValues()

        if (this.dateTableModel.isCreated()) {
            this.baseGenerate(iniValues.bottomHeight, iniValues.workTableNum)
            this.assemble(iniValues.weekRule)
        }
    }

    private baseGenerate(bottomHeight: number, workTableNum: number): void {

        const workTableIniPosition: {[key: string]: number} = this.workTableModel.getIniPopsition()
        const workTableSize: {[key: string]: number} = this.workTableModel.getWorkTableSize(bottomHeight)

        const optionWorkTableIniPosition: {[key: string]: number} = this.workTableModel.getSubIniPopsition(workTableIniPosition.column, workTableSize.width)
        const optionWorkTable: Spreadsheet.Range = this.tableReferenceModel.selectTable(optionWorkTableIniPosition.row, optionWorkTableIniPosition.column, workTableSize.height, workTableSize.width + 1)

        const allWorkTableWidth = workTableNum * workTableSize.width
        const workTableEndPoint: number = allWorkTableWidth + workTableIniPosition.column

        this.assembleModel.moveTo(optionWorkTable, 1, workTableEndPoint)

        const workTable: Spreadsheet.Range = this.tableReferenceModel.selectTable(workTableIniPosition.row, workTableIniPosition.column, workTableSize.height, workTableSize.width)
        this.assembleModel.pushColumnTable(workTable, workTableSize.width, workTableNum, workTableIniPosition.column)
    }

    private assemble(weekRule: number): void {

        const sheetSize: {[key: string]: number} = this.queryModel.getSheetSize()
        const tableDateInfo: {[key: string]: number} = this.dateTableModel.bundleTableDate()
        tableDateInfo.weekRule = weekRule

        const insertItems: string[][] = this.assembleModel.getInsertItems(tableDateInfo)
        const targetRow: number = sheetSize.height

        const dateTable: Spreadsheet.Range = this.dateTableModel.getDateWeekTable(targetRow - 1, insertItems.length)

        this.tableReferenceModel.insertRecord(targetRow, insertItems.length - 1)
        this.tableReferenceModel.setValues(dateTable, insertItems)
    }
}