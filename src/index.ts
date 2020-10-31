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

const run = (): void => {
    const tableGenerator: TableGenerator = new TableGenerator()
    tableGenerator.setMaster(MASTER_NAME)
    tableGenerator.main()
}

const htmlGenerator = (): GoogleAppsScript.HTML.HtmlOutput => {
    const html = HtmlService.createTemplateFromFile('notice')
    return html.evaluate().setTitle('TableGenerator')
}

global.TableGenerator = (): void => {
    run()
}

global.doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
    run()
    return htmlGenerator()
}