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

    /**
     * コピー元レコードを選択
     */
    private selectBaseRecord(row: number, tableWidth: number): Spreadsheet.Range {

        const column: number = 1
        const numRows: number = 1
        const numColumns: number = tableWidth

        return this.sheet.getRange(row, column, numRows, numColumns)
    }

    /**
     * 指定した月の日数を取得
     */
    private monthMeasure(tableDate: {[name: string]: number}): number {

        const date = new Date(tableDate.year, tableDate.month, 0)
        return date.getDate()
    }

    public main(): void {

        const INI_START_ROW: number = 3
        const INI_POSITION_RULE: number[] = [2, 2]

        const tableDate: {[name: string]: number} = this.fetchRule.tableDate()
        const maxHeight: number = this.monthMeasure(tableDate)
        const tableWidth: number = this.tableMeasure.width(1, 1)
        const selectedBaseRecord: Spreadsheet.Range = this.selectBaseRecord(INI_START_ROW, tableWidth)

        // テーブル作成ルールを取得
        const ruleBook: string = this.assemble.readRule(INI_POSITION_RULE[0], INI_POSITION_RULE[1])
        this.assemble.main(INI_START_ROW, tableDate, maxHeight, tableWidth, ruleBook, selectedBaseRecord)
    }

    public setMaster(master: {[name: string]: string[]}): void {

        this.assemble.setMaster(master)
    }
}