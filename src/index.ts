import TableGenerator from '@src/app/TableGenerator'

const INI_START_ROW: number = 3
const INI_RULE_POSITION: number[] = [2, 2]
const MASTER_WEEK_NAME: string[] = [
    '=master!C2',
    '=master!C3',
    '=master!C4',
    '=master!C5',
    '=master!C6',
    '=master!C7',
    '=master!C8',
]

global.TableGenerator = (): void => {
    const tableGenerator: TableGenerator = new TableGenerator()
    tableGenerator.setIni(INI_START_ROW, INI_RULE_POSITION, MASTER_WEEK_NAME)
    tableGenerator.main()
}