// declares
import Spreadsheet = GoogleAppsScript.Spreadsheet
// models
import ErrorHandler from "@src/models/common/ErrorHandler"

export default class AssembleModel {

    private readonly sheet: Spreadsheet.Sheet

    private readonly errorHandler: ErrorHandler

    public constructor(sheet: Spreadsheet.Sheet) {

        this.sheet = sheet

        this.errorHandler = new ErrorHandler()
    }

    public moveTo(targetRange: Spreadsheet.Range, targetRow: number, targetColumn: number): void {

        const address: Spreadsheet.Range = this.sheet.getRange(targetRow, targetColumn)
        targetRange.moveTo(address)
    }

    public copyTo(targetRange: Spreadsheet.Range, targetRow: number, targetColumn: number): void {

        const address: Spreadsheet.Range = this.sheet.getRange(targetRow, targetColumn)
        targetRange.copyTo(address)
    }

    public pushColumnTable(targetRange: Spreadsheet.Range, workTableWidth: number, workTableNum: number, currentColumn: number, loopCounter: number = 1): void {

        this.errorHandler.checkInfiniteLoop(loopCounter)

        if (workTableNum < loopCounter) {
            return
        }
        this.copyTo(targetRange, 1, currentColumn)

        currentColumn = currentColumn + workTableWidth
        loopCounter ++

        return this.pushColumnTable(targetRange, workTableWidth, workTableNum, currentColumn, loopCounter)
    }

    public getInsertItems(tableDateInfo: {[key: string]: number}, currentDate: number = 1, insertItems: string[][] = []): string[][] {

        this.errorHandler.checkInfiniteLoop(currentDate)

        if (tableDateInfo.endOfMonth < currentDate) {
            return insertItems
        }

        const currentWeek: number = this.getWeekNum(tableDateInfo, currentDate)

        if (this.canInsert(tableDateInfo, currentWeek)) {
            insertItems.push([String(currentDate), this.getCurrentWeek(currentWeek)])
        }
        currentDate ++

        return this.getInsertItems(tableDateInfo, currentDate, insertItems)
    }

    private canInsert(tableDateInfo: {[key: string]: number}, currentWeek: number): boolean {

        if (tableDateInfo.weekRule === 0 || tableDateInfo.weekRule === currentWeek) {
            return true
        }
        return false
    }

    private getCurrentWeek(currentWeek: number): string {

        const WEEK = ['日', '月', '火', '水', '木', '金', '土', '日']
        return WEEK[currentWeek - 1]
    }

    private getWeekNum(tableDateInfo: {[key: string]: number}, currentDate: number): number {

        const date: Date = new Date(tableDateInfo.year, tableDateInfo.month - 1, currentDate)
        return date.getDay() + 1
    }
}