// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class Assemble {

    private sheet: Spreadsheet.Sheet

    private master: {[name: string]: string[]}

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.master = {}
    }

    private refresh(row: number, width: number): void {

        this.sheet.getRange(row, 1).setValue('-')
        this.sheet.getRange(row, 1, 1, width).setBorder(true, true, true, true, true, true)
    }

    private decorateRecord(currentRow: number, currentDate: string[][]) {

        this.sheet.getRange(currentRow, 1, 1, 2).setValues(currentDate)
    }

    private addRecord(currentRow: number, baseSelected: Spreadsheet.Range): void {

        const address = this.sheet.getRange(currentRow, 1)
        baseSelected.copyTo(address)
    }

    private prepareDate(tableDate: {[name: string]: number}): string[][] {

        const date: Date = new Date(Number(tableDate.year), Number(tableDate.month) - 1, Number(tableDate.date))
        const weekNumber: number = date.getDay()

        return [[String(tableDate.date), this.master.WEEKS[weekNumber]]]
    }

    private work(tableDate: {[name: string]: number}, height: number, ruleBook: string, baseSelected: Spreadsheet.Range, i: number, currentRow: number = i): number {

        if (i > height) {
            return currentRow
        }

        tableDate.date = (i - i + 1)
        const currentDate = this.prepareDate(tableDate)

        // rule week
        if (ruleBook === currentDate[0][1] || ruleBook === '') {
            this.addRecord(currentRow, baseSelected)
            this.decorateRecord(currentRow, currentDate)
            currentRow ++
        }
        // add loop counter
        i ++
        return this.work(tableDate, height, ruleBook, baseSelected, i, currentRow)
    }

    public readRule(row: number, column: number): string {

        const rule
        = this.sheet.getRange(row, column).getValue()
        return rule
    }

    public main(iniRow: number, tableDate: {[name: string]: number}, height: number, width: number, ruleBook: string, baseSelected: Spreadsheet.Range): void {

        let i: number = iniRow

        const currentRow = this.work(tableDate, height, ruleBook, baseSelected, i)
        this.refresh(currentRow, width)
    }

    public setMaster(master: {[name: string]: string[]}): void {

        this.master = master
    }
}