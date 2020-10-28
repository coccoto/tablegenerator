import TableGenerator from '@src/app/TableGenerator'

const MASTER_NAME: {[name: string]: string[]} = {
    WEEKS: [
        '=master!C2',
        '=master!C3',
        '=master!C4',
        '=master!C5',
        '=master!C6',
        '=master!C7',
        '=master!C8',
    ]
}

global.TableGenerator = (): void => {
    const tableGenerator: TableGenerator = new TableGenerator()
    tableGenerator.setMaster(MASTER_NAME)
    tableGenerator.main()
}