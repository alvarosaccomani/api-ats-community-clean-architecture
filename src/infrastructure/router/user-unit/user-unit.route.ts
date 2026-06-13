import { Express } from "express";
import { SequelizeRepository } from "../../repository/user-unit/sequelize-user-unit.repository";
import { UserUnitUseCase } from "../../../application/user-unit/user-unit-use-case";
import { UserUnitController } from "../../controller/user-unit/user-unit.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureUserUnitRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeUserUnitRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const userUnitUseCase = new UserUnitUseCase(sequelizeUserUnitRepository);
    
    /*
    *   Iniciar controller
    */
    const userUnitCtrl = new UserUnitController(userUnitUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/user-units/:cmp_uuid/:usr_uuid`, userUnitCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/user-units/unit/:cmp_uuid/:uni_uuid`, userUnitCtrl.getUnitUsersCtrl);
    app.get(`/${process.env.BASE_URL_API}/user-unit/:cmp_uuid/:usr_uuid/:uni_uuid`, userUnitCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/user-unit`, userUnitCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/user-unit/:cmp_uuid/:usr_uuid/:uni_uuid`, userUnitCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/user-unit/:cmp_uuid/:usr_uuid/:uni_uuid`, userUnitCtrl.deleteCtrl);
}

export default configureUserUnitRoutes;
