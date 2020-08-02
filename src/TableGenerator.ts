// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableGenerator {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    private insert(row: number, tableDate: {[name: string]: string}): void {

        const date = new Date(Number(tableDate.year), Number(tableDate.month) - 1, Number(tableDate.date))
        const day = date.getDay()
        const weeks: string[] = ['日', '月', '火', '水', '木', '金', '土']

        this.sheet.getRange(row, 1, 1, 2).setValues([[tableDate.date, weeks[day]]])
    }

    private push(row: number, selected: Spreadsheet.Range): void {

        const address = this.sheet.getRange(row, 1)
        selected.copyTo(address)
    }

    private assemble(tableDate: {[name: string]: string}, tableHeight: number, selected: Spreadsheet.Range): void {

        const ROW_INIT: number = 3
        let i: number = ROW_INIT

        while (i !== tableHeight + ROW_INIT) {
            tableDate['date'] = String(i - ROW_INIT + 1)
            this.push(i, selected)
            this.insert(i, tableDate)
            i ++

            if (! (i !== tableHeight + ROW_INIT)) {
                this.sheet.getRange(i, 1).setValue('-')
            }
        }
    }

    private select(tableWidth: number): Spreadsheet.Range {

        const rowFrom: number = 3
        const columnFrom: number = 1
        const rowTo: number = 1
        const columnTo: number = tableWidth

        return this.sheet.getRange(rowFrom, columnFrom, rowTo, columnTo)
    }

    private tableWidth(i: number = 3): number {

        let endPoint: string = this.sheet.getRange(1, i).getValue()

        if (endPoint === '-') {
            return (i - 1)
        }
        i ++
        return this.tableWidth(i)
    }

    private tableHeight(tableDate: {[name: string]: string}): number {

        const date = new Date(Number(tableDate.year), Number(tableDate.month), 0)
        return date.getDate()
    }

    private tableDate(): {[name: string]: string} {

        return {
            year: '20' + this.sheet.getRange(1, 1).getValue(),
            month: this.sheet.getRange(1, 2).getValue(),
        }
    }

    public main(): void {

        const tableDate: {[name: string]: string} = this.tableDate()
        const tableHeight: number = this.tableHeight(tableDate)
        const tableWidth: number = this.tableWidth()

        const selected: Spreadsheet.Range = this.select(tableWidth)

        this.assemble(tableDate, tableHeight, selected)
    }
}