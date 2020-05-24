class TableGenerator {

    constructor() {

        this.sheet = SpreadsheetApp.getActiveSheet()
    }

    /**
     * select を選択範囲に貼り付ける。
     * 
     * @param {number} row
     * @param {object} select
     * @return {void}
     */
    push(row, select) {

        const target = this.sheet.getRange(row, 1)
        select.copyTo(target)
    }

    /**
     * データを追加する。
     * 
     * @param {number} tableHeight
     * @param {array} tableDate
     * @param {object} select
     * @return {void}
     */
    insert(tableHeight, tableDate, select) {

        for (let i = 3 + 1; i < tableHeight + 3; i ++) {
            this.push(i, select)
            this.output(i, {year: tableDate.year, month: tableDate.month, date: i - 3 + 1})

            if (i === tableHeight + 3 - 1) {
                this.sheet.getRange(i + 1, 1).setValue('-')
            }
        }
    }

    /**
     * データに日付を記入する。
     * 
     * @param {number} row
     * @param {array} tableDate
     * @return {void}
     */
    output(row, tableDate) {

        const date = new Date(tableDate.year, tableDate.month - 1, tableDate.date)
        const week = date.getDay()

        const items = ['日', '月', '火', '水', '木', '金', '土']

        this.sheet.getRange(row, 1).setValue(tableDate.date)
        this.sheet.getRange(row, 2).setValue(items[week])
    }

    /**
     * 月末日を取得する。
     * 
     * @param {number} year
     * @param {number} month
     * @return {number}
     */
    tableHeight(year, month) {

        const date = new Date(year, month, 0)
        return date.getDate()
    }

    /**
     * テーブルの幅を取得する。
     * 
     * @return {number}
     */
    tableWidth() {

        let point = null
        let i = 1

        while (point !== '-') {
            point = this.sheet.getRange(1, i).getValue()
            i ++
        }
        return (i - 1)
    }

    /**
     * 日付を取得する。
     * 
     * @return {array}
     */
    tableDate() {

        return {
            year: '20' + this.sheet.getRange(1, 1).getValue(),
            month: this.sheet.getRange(1, 2).getValue(),
        }
    }

    /**
     * エントリーポイント
     * 
     * @return {void}
     */
    execute() {

        // 日付を取得する。
        const tableDate = this.tableDate()
        // 月末日を取得する。
        const tableHeight = this.tableHeight(tableDate.year, tableDate.month)
        // テーブルの幅を取得する。
        const tableWidth = this.tableWidth()

        // コピー元の範囲を選択する。
        const select = this.sheet.getRange(3, 1, 1, tableWidth)
        // コピー元に日付を記入する。
        this.output(3, {year: tableDate.year, month: tableDate.month, date: 1})

        // データを追加する。
        this.insert(tableHeight, tableDate, select)
    }
}