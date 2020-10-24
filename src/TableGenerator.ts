// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class TableGenerator {

    private sheet: Spreadsheet.Sheet

    public constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * 日付と曜日を差し込む
     * 
     * @return {boolena} success
     */
    private insert(row: number, tableDate: string[][], rule: string): boolean {

        this.sheet.getRange(row, 1, 1, 2).setValues(tableDate)
        return true
    }

    /**
     * 選択済みレコードをペースト
     */
    private push(row: number, selected: Spreadsheet.Range): void {

        const address = this.sheet.getRange(row, 1)
        selected.copyTo(address)
    }

    /**
     * 日付から曜日を取得
     */
    private prepareDate(tableDate: {[name: string]: string}): string[][] {

        const date = new Date(Number(tableDate.year), Number(tableDate.month) - 1, Number(tableDate.date))
        const day = date.getDay()
        // 曜日
        const WEEKS: string[] = ['日', '月', '火', '水', '木', '金', '土']

        return [[tableDate.date, WEEKS[day]]]
    }

    /**
     * テーブルを組み立てる
     */
    private assemble(tableDate: {[name: string]: string}, tableHeight: number, tableWidth: number, selected: Spreadsheet.Range): void {

        const ROW_INIT: number = 3
        // ループカウンター
        let i: number = ROW_INIT
        // 現在列
        let c: number = ROW_INIT

        // 指定された曜日のレコードだけを作成（未指定なら全件作成）
        const createRule: string = this.sheet.getRange(2, 2).getValue()
        // 現在日時
        let currentDate: string[][]

        while (i !== tableHeight + ROW_INIT) {
            // 対応する日付を取得
            tableDate.date = String(i - ROW_INIT + 1)
            // 曜日を取得
            currentDate = this.prepareDate(tableDate)

            // ルールに合致もしくはルール未指定時、レコードを追加
            if (createRule === currentDate[0][1] || createRule === '') {
                this.push(c, selected)
                this.insert(c, currentDate, createRule)
                // 現在列をインクリメント
                c ++
            }
            // ループカウンターをインクリメント
            i ++
            // 最終行
            if (! (i !== tableHeight + ROW_INIT)) {
                this.sheet.getRange(c, 1).setValue('-')
                this.sheet.getRange(c, 1, 1, tableWidth).setBorder(true, true, true, true, true, true)
            }
        }
    }

    /**
     * 貼り付け元のレコードを選択
     */
    private select(tableWidth: number): Spreadsheet.Range {

        const rowFrom: number = 3
        const columnFrom: number = 1
        const rowTo: number = 1
        const columnTo: number = tableWidth

        return this.sheet.getRange(rowFrom, columnFrom, rowTo, columnTo)
    }

    /**
     * テーブルの横幅を取得
     */
    private tableWidth(i: number = 3): number {

        let endPoint: string = this.sheet.getRange(1, i).getValue()

        if (endPoint === '-') {
            return (i - 1)
        }
        i ++
        return this.tableWidth(i)
    }

    /**
     * 日付から生成するテーブルの縦幅を取得
     */
    private tableHeight(tableDate: {[name: string]: string}): number {

        const date = new Date(Number(tableDate.year), Number(tableDate.month), 0)
        return date.getDate()
    }

    /**
     * テーブルにセットされている年月を取得
     */
    private tableDate(): {[name: string]: string} {

        return {
            year: '20' + this.sheet.getRange(1, 1).getValue(),
            month: this.sheet.getRange(1, 2).getValue(),
        }
    }

    public main(): void {

        const tableDate: {[name: string]: string} = this.tableDate()
        // 縦幅を取得
        const tableHeight: number = this.tableHeight(tableDate)
        // 横幅を取得
        const tableWidth: number = this.tableWidth()

        // 列をコピー
        const selected: Spreadsheet.Range = this.select(tableWidth)

        this.assemble(tableDate, tableHeight, tableWidth, selected)
    }
}