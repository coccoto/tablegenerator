// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class FetchRule {

    private sheet: Spreadsheet.Sheet

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet
    }

    /**
     * @return {string} week
     */
    public createRule(): String {

        return this.sheet.getRange(2, 2).getValue()
    }

    public tableDate(): {[name: string]: number} {

        const values: number[][] = this.sheet.getRange(1, 1, 1, 2).getValues()

        return {
            year: Number('20' + String(values[0][1])),
            month: Number(values[0][1]),
        }
    }
}