// controllers
import IndexController from '@/controllers/IndexController'

const runIndexController = (): void => {
    const indexController: IndexController = new IndexController()
    indexController.main()
}

global.main = (): void => {
    runIndexController()
}
