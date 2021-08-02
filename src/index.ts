// controllers
import IndexController from '@src/controllers/IndexController'

global.TableGenerator = (): void => {
    const indexController: IndexController = new IndexController()
    indexController.main()
}