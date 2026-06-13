import { Express } from "express";
import { SequelizeRepository } from "../../repository/transaction/sequelize-transaction.repository";
import { TransactionUseCase } from "../../../application/transaction/transaction-use-case";
import { TransactionController } from "../../controller/transaction/transaction.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureTransactionRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    const sequelizeTransactionRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    const transactionUseCase = new TransactionUseCase(sequelizeTransactionRepository);
    
    /*
    *   Iniciar controller
    */
    const transactionCtrl = new TransactionController(transactionUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/transactions/:cmp_uuid`, transactionCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/transactions/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid`, transactionCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/transaction/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid/:tra_uuid`, transactionCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/transaction`, transactionCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/transaction/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid/:tra_uuid`, transactionCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/transaction/:cmp_uuid/:usr_uuid/:uni_uuid/:usruni_uuid/:fee_uuid/:tra_uuid`, transactionCtrl.deleteCtrl);
}

export default configureTransactionRoutes;
