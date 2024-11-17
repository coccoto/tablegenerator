// services
import IndexService from '@/services/IndexService'
// utils
import SheetReader from '@/utils/SheetReader'

export default class IndexController {

    private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet
    private readonly config: {[key: string]: string}
    private readonly indexService: IndexService

    public constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
        this.config = SheetReader.getSheetValue('config')
        this.indexService = new IndexService()
    }

    public main(): void {
        this.writeYearMonth()
        this.insertTableRow()
    }

    /**
     * テーブルに処理対象の年月を入力する
     */
    private writeYearMonth(): void {
        const startRow: number = 1
        const startColumn: number = 1
        // 年月列の幅 (一列目：年 | 二列目：月)
        const yearMonthColumnWidth: number = 2

        // テーブルに入力する年月を取得する
        const outputYearMonthList = this.indexService.getOutputYearMonthList()

        // テーブルに年月を入力する
        const targetRange = this.sheet.getRange(startRow, startColumn, outputYearMonthList.length, yearMonthColumnWidth)
        targetRange.setValues(outputYearMonthList)
    }

    /**
     * テーブルに指定した数分の行を追加する
     */
    private insertTableRow(): void {
        const startRow: number = 3
        const startColumn: number = 1
        // 日付列の幅 (一列目：日付 | 二列目：曜日)
        const dateColumnWidth: number = 2

        // テーブルに入力する日付を取得する
        const outputDateList: string[][] = this.indexService.getOutputDateList()

        // テーブルに行を追加する
        this.sheet.insertRowsAfter(startRow, outputDateList.length - 1) 
        // テーブルに日付を入力する
        const targetRange = this.sheet.getRange(startRow, startColumn, outputDateList.length, dateColumnWidth)
        targetRange.setValues(outputDateList)
    }
}
