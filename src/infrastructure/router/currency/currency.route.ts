import { Express } from "express";
import { SequelizeRepository } from "../../repository/currency/sequelize-currency.repository";
import { CurrencyUseCase } from "../../../application/currency/currency-use-case";
import { CurrencyController } from "../../controller/currency/currency.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureCurrencyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCurrencyRepository = new SequelizeRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const currencyUseCase = new CurrencyUseCase(sequelizeCurrencyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const currencyCtrl = new CurrencyController(currencyUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/currencies`, currencyCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/currency`, currencyCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/currency/:cur_uuid`, currencyCtrl.deleteCtrl);
}

export default configureCurrencyRoutes;
