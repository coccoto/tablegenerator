// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// modules
import Assemble from '@src/app/Assemble'
import Fetch from '@src/app/Fetch'
// helper
import TableMeasure from '@src/app/helper/TableMeasure'

export default class TableGenerator {

    private sheet: Spreadsheet.Sheet

    private assemble: Assemble
    private fetch: Fetch
    private tableMeasure: TableMeasure

    private iniStartRow: number
    private iniRulePosition: number[]
    private masterWeekName: string[]

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()

        this.assemble = new Assemble(this.sheet)
        this.fetch = new Fetch(this.sheet)
        this.tableMeasure = new TableMeasure(this.sheet)

        this.iniStartRow = 0
        this.iniRulePosition = []
        this.masterWeekName = []
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

        const tableDate: {[name: string]: number} = this.fetch.tableDate()
        const maxHeight: number = this.monthMeasure(tableDate)
        const tableWidth: number = this.tableMeasure.width(this.iniStartRow, 1)

        const selected: Spreadsheet.Range = this.selectBase(this.iniStartRow, tableWidth)

        this.assemble.setIni(this.iniStartRow, this.iniRulePosition, this.masterWeekName)
        this.assemble.main(tableDate, maxHeight, tableWidth, selected)
    }

    public setIni(INI_START_ROW: number, INI_RULE_POSITION: number[], MASTER_WEEK_NAME: string[]) {

        this.iniStartRow = INI_START_ROW
        this.iniRulePosition = INI_RULE_POSITION
        this.masterWeekName = MASTER_WEEK_NAME
    }
}