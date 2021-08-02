// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet

export default class ErrorHandler {

    public checkSheet(sheet: Spreadsheet.Sheet | null): Spreadsheet.Sheet {

        if (sheet === null) {
            throw new Error()
        }
        return sheet
    }

    public checkInfiniteLoop(i: number): void {

        if (i > 100) {
            throw new Error()
        }
    }
}