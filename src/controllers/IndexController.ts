// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from '@/models/common/ErrorHandler'
import QueryModel from '@/models/common/QueryModel'
import AssembleModel from '@/models/AssembleModel'
import DateTableModel from '@/models/DateTableModel'
import ReflectionModel from '@/models/ReflectionModel'
import HelperModel from '@/models/HelperModel'
import WorkTableModel from '@/models/WorkTableModel'

export default class IndexController {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler
    private readonly queryModel: QueryModel
    private readonly assembleModel: AssembleModel
    private readonly dateTableModel: DateTableModel
    private readonly reflectionModel: ReflectionModel
    private readonly helperModel: HelperModel
    private readonly workTableModel: WorkTableModel

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.errorHandler = new ErrorHandler()
        this.queryModel = new QueryModel(this.sheet, this.errorHandler)
        this.assembleModel = new AssembleModel(this.sheet, this.queryModel)
        this.dateTableModel = new DateTableModel(this.sheet, this.queryModel)
        this.reflectionModel = new ReflectionModel(this.sheet)
        this.helperModel = new HelperModel(this.sheet, this.queryModel)
        this.workTableModel = new WorkTableModel(this.sheet, this.queryModel)
    }

    public main(): void {

        const iniValues: Associative = this.helperModel.bundleIniValues()
        const dateWorkTableIniPosition: Associative = this.dateTableModel.getDateWorkTableIniPosition()

        if (this.helperModel.isCreated(dateWorkTableIniPosition.row, dateWorkTableIniPosition.column)) {
            return
        }
        this.baseGenerate(iniValues.bottomHeight, iniValues.workTableNum)
        this.insertRecord(iniValues.bottomHeight, iniValues.weekRule)
    }

    private baseGenerate(bottomHeight: number, workTableNum: number): void {

        const workTableIniPosition: Associative = this.workTableModel.getWorkTableIniPosition()
        const workTableSize: Associative = this.workTableModel.getWorkTableSize(bottomHeight)

        const optionWorkTableIniPosition: Associative = this.workTableModel.getOptionTableIniPosition(workTableIniPosition.column, workTableSize.width)

        this.reflectionModel.main(workTableNum, workTableIniPosition, workTableSize, optionWorkTableIniPosition)
    }

    private insertRecord(bottomHeight: number, weekRule: number): void {

        const sheetSize: Associative = this.queryModel.getSheetSize()
        const tableDateInfo: Associative = this.dateTableModel.bundleTableDate()
        tableDateInfo.weekRule = weekRule

        const resultDateValues = this.assembleModel.main(sheetSize, tableDateInfo, bottomHeight)
        this.dateTableModel.decorateDateValue(resultDateValues)
    }
}