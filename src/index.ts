// controllers
import IndexController from '@src/controllers/IndexController'

const run = (): void => {
    const indexController: IndexController = new IndexController()
    indexController.main()
}

const htmlGenerator = (): GoogleAppsScript.HTML.HtmlOutput => {
    const html = HtmlService.createTemplateFromFile('notice')
    return html.evaluate().setTitle('Tablegenerator')
}

global.main = (): void => {
    run()
}

global.doGet = (): GoogleAppsScript.HTML.HtmlOutput => {
    run()
    return htmlGenerator()
}