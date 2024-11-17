export default class SheetReader {

    /**
     * セル範囲 A:B の値を連想配列として取得する
     */
    public static getSheetValue(sheetName: string): {[key: string]: string} {
        const result: {[key: string]: string} = {}

        const sheet: GoogleAppsScript.Spreadsheet.Sheet | null = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
        if (sheet === null) {
            throw new Error()
        }
        const sheetValueList = sheet.getRange('A:B').getValues()

        for (const sheetValue of sheetValueList) {
            result[sheetValue[0]] = sheetValue[1]
        }
        return result
    }

    /**
     * シートの名称を取得する
     */
    public static getSheetName(): string {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
        const sheetName = sheet.getName()
        return sheetName
    }
}