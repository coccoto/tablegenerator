// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class Assemble {

    private sheet: Spreadsheet.Sheet

    private iniStartRow: number
    private iniRulePosition: number[]
    private masterWeekName: string[]

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.iniStartRow = 0
        this.iniRulePosition = []
        this.masterWeekName = []
    }

    private decorateRecord(currentRow: number, currentDate: string[][]) {

        
    }

    private addRecord(currentRow: number, baseSelected: Spreadsheet.Range): void {

        const address = this.sheet.getRange(currentRow, 1)
        baseSelected.copyTo(address)
    }

    private prepareDate(tableDate: {[name: string]: number}): string[][] {

        const date = new Date(Number(tableDate.year), Number(tableDate.month) - 1, Number(tableDate.date))
        const week = date.getDay()

        const WEEKS

        return [[tableDate.date, WEEKS[week]]]
    }

    private insert(tableDate: {[name: string]: number}, baseSelected: Spreadsheet.Range, i: number, currentRow: number) {

        if () {
            return
        }

        tableDate.date = (i - this.iniStartRow + 1)
        const currentDate = this.prepareDate(tableDate)

        this.addRecord(currentRow, baseSelected)
        this.decorateRecord(currentRow, currentDate)
    }

    private readRule(): string {

        const rule
        = this.sheet.getRange(this.iniRulePosition[0], this.iniRulePosition[1]).getValue()
        return rule
    }

    public main(tableDate: {[name: string]: number}, height: number, width: number, baseSelected: Spreadsheet.Range): void {

        let i: number = this.iniStartRow
        let currentRow: number = this.iniStartRow

        const ruleBook = this.readRule()

    }

    public setIni(startRow: number, rulePosition: number[], masterWeekName: string[]): void {

        this.iniStartRow = startRow
        this.iniRulePosition = rulePosition
        this.masterWeekName = masterWeekName
    }
}