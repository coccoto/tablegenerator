import TableGenerator from '@src/app/TableGenerator'

const MASTER_NAME: {[name: string]: string[]} = {
    WEEKS: [
        '日',
        '月',
        '火',
        '水',
        '木',
        '金',
        '土',
    ]
}

global.TableGenerator = (): void => {
    const tableGenerator: TableGenerator = new TableGenerator()
    tableGenerator.setMaster(MASTER_NAME)
    tableGenerator.main()
}