// utils
import SheetReader from '@/utils/SheetReader'

export default class IndexService {

    /**
     * テーブルに入力する年月の配列を取得する
     */
    public getOutputYearMonthList(): string[][] {
        const yearMonth = this.getYearMonth()
        const resultYearMonthList = [[
            String(yearMonth.year).substring(2, 4),
            String(yearMonth.month).padStart(2, '0')
        ]]
        return resultYearMonthList
    }

    /**
     * テーブルに入力する日付の配列を取得する
     */
    public getOutputDateList() {
        const yearMonth = this.getYearMonth()
        const selectedDate = new Date(yearMonth.year, yearMonth.month - 1, 1)
        const dateTimeFormat = new Intl.DateTimeFormat('ja-JP', { weekday: 'short' });

        const resultDateList = []
        while (selectedDate.getMonth() === yearMonth.month - 1) {

            if (selectedDate.getDay() === 0) {
                resultDateList.push([
                    String(selectedDate.getDate()).padStart(2, '0'),
                    dateTimeFormat.format(selectedDate)
                ])
            }
            selectedDate.setDate(selectedDate.getDate() + 1)
        }
        return resultDateList
    }

    /**
     * シート名を解析して年月を取得する
     */
    public getYearMonth(): {[key: string]: number} {
        const sheetName = SheetReader.getSheetName()
        const splitSheetName = sheetName.split('-')

        if (splitSheetName.length !== 2) {
            throw new Error()
        }
        if (splitSheetName[0].length !== 2 || splitSheetName[1].length !== 2) {
            throw new Error()
        }
        const year = Number('20' + splitSheetName[0])
        const month = Number(splitSheetName[1])

        return {
            year: year,
            month: month,
        }
    }
}
