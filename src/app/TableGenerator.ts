// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// modules
import Assemble from '@src/app/Assemble'
import FetchRule from '@src/app/FetchRule'
// helper
import TableMeasure from '@src/app/helper/TableMeasure'

export default class TableGenerator {

    private sheet: Spreadsheet.Sheet

    private assemble: Assemble
    private fetchRule: FetchRule
    private tableMeasure: TableMeasure

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.assemble = new Assemble(this.sheet)
        this.fetchRule = new FetchRule(this.sheet)
        this.tableMeasure = new TableMeasure(this.sheet)
    }

    private selectBase(row: number, tableWidth: number): Spreadsheet.Range {

        const column: number = 0
        const numRows: number = 0
        const numColumns: number = tableWidth

        return this.sheet.getRange(row, column, numRows, numColumns)
    }

    private monthMeasure(tableDate: {[name: string]: number}): number {

        const date = new Date(tableDate.year, tableDate.month, 0)
        return date.getDate()
    }

    public main(): void {

        const INI_START_ROW: number = 3
        const INI_POSITION_RULE: number[] = [2, 2]

        const tableDate: {[name: string]: number} = this.fetchRule.tableDate()
        const maxHeight: number = this.monthMeasure(tableDate)
        const tableWidth: number = this.tableMeasure.width(INI_START_ROW, 1)
        const selected: Spreadsheet.Range = this.selectBase(INI_START_ROW, tableWidth)

        const ruleBook: string = this.assemble.readRule(INI_POSITION_RULE[0], INI_POSITION_RULE[1])
        this.assemble.main(INI_START_ROW, tableDate, maxHeight, tableWidth, ruleBook, selected)
    }

    public setMaster(master: {[name: string]: string[]}): void {

        this.assemble.setMaster(master)
    }
}