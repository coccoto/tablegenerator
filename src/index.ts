// controllers
import IndexController from '@src/controllers/IndexController'

global.main = (): void => {
    const indexController: IndexController = new IndexController()
    indexController.main()
}