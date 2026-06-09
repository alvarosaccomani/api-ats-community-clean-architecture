import { Express } from "express";
import { SequelizeRepository as SequelizeMenuRepository } from "../../repository/menu/sequelize-menu.repository";
import { MenuUseCase } from "../../../application/menu/menu-use-case";
import { MenuController } from "../../controller/menu/menu.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureMenuRoutes(app: Express) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeMenuRepository = new SequelizeMenuRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const menuUseCase = new MenuUseCase(sequelizeMenuRepository);
    
    /*
    *   Iniciar controller
    */
    
    const menuCtrl = new MenuController(menuUseCase);
    app.get(`/${process.env.BASE_URL_API}/menus`, menuCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/menu-tree`, menuCtrl.getMenuItemsCtrl);
    app.get(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, menuCtrl.getDetailCtrl);
    app.post(`/${process.env.BASE_URL_API}/menu`, authMiddleware, menuCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, authMiddleware, menuCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/menu/:mnu_uuid`, authMiddleware, menuCtrl.deleteCtrl);
}

export default configureMenuRoutes;
