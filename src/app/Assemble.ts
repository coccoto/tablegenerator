// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class Assemble {

    private sheet: Spreadsheet.Sheet

    private master: {[name: string]: string[]}

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.master = {}
    }

    /**
     * 最終行にレコードを追加
     */
    private refresh(row: number, width: number): void {

        this.sheet.getRange(row, 1).setValue('-')
        this.sheet.getRange(row, 1, 1, width).setBorder(true, true, true, true, true, true)
    }

    /**
     * レコードに情報を書き込む
     */
    private decorateRecord(currentRow: number, currentDate: string[][]) {

        this.sheet.getRange(currentRow, 1, 1, 2).setValues(currentDate)
    }

    /**
     * レコードを追加
     */
    private addRecord(currentRow: number, baseRecord: Spreadsheet.Range): void {

        const address: Spreadsheet.Range = this.sheet.getRange(currentRow, 1)
        baseRecord.copyTo(address)
    }

    /**
     * レコードに書き込む情報を取得
     */
    private prepareDate(tableDate: {[name: string]: number}): string[][] {

        const date: Date = new Date(Number(tableDate.year), Number(tableDate.month) - 1, Number(tableDate.date))
        const weekNumber: number = date.getDay()

        return [[String(tableDate.date), this.master.WEEKS[weekNumber]]]
    }

    /**
     * @再帰処理
     * 
     * テーブルにレコードを追加
     */
    private work(iniRow: number, tableDate: {[name: string]: number}, height: number, ruleBook: string, baseRecord: Spreadsheet.Range, i: number, currentRow: number = i): number {

        if (i > height + iniRow) {
            return currentRow
        }

        tableDate.date = (i - iniRow + 1)
        const currentDate = this.prepareDate(tableDate)

        // ルールブックのデータと一致 もしくは ルールブックにデータがない
        if (ruleBook === currentDate[0][1] || ruleBook === '') {
            this.addRecord(currentRow, baseRecord)
            this.decorateRecord(currentRow, currentDate)
            // 現在列カウンター
            currentRow ++
        }
        // ループカウンター
        i ++
        return this.work(iniRow, tableDate, height, ruleBook, baseRecord, i, currentRow)
    }

    /**
     * テーブル作成ルールを取得
     */
    public readRule(row: number, column: number): string {

        const rule
        = this.sheet.getRange(row, column).getValue()
        return rule
    }

    public main(iniRow: number, tableDate: {[name: string]: number}, height: number, width: number, ruleBook: string, baseRecord: Spreadsheet.Range): void {

        let i: number = iniRow

        const currentRow: number = this.work(iniRow, tableDate, height, ruleBook, baseRecord, i)
        this.refresh(currentRow, width)
    }

    public setMaster(master: {[name: string]: string[]}): void {

        this.master = master
    }
}