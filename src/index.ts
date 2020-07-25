import TableGenerator from '@src/TableGenerator'

global.TableGenerator = (): void => {
    const tableGenerator: TableGenerator = new TableGenerator()
    tableGenerator.main()
}