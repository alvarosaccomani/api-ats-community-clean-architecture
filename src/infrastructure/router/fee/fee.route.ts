import { Express } from "express";
import { SequelizeRepository } from "../../repository/fee/sequelize-fee.repository";
import { FeeUseCase } from "../../../application/fee/fee-use-case";
import { FeeController } from "../../controller/fee/fee.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureFeeRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeFeeRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const feeUseCase = new FeeUseCase(sequelizeFeeRepository);
    
    /*
    *   Iniciar controller
    */
    const feeCtrl = new FeeController(feeUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/fees/:cmp_uuid`, feeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/fees/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid`, feeCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/fee/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid`, feeCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/fee`, feeCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/fee/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid`, feeCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/fee/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid`, feeCtrl.deleteCtrl);
}

export default configureFeeRoutes;
