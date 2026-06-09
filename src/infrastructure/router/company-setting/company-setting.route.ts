import { Express } from "express";
import { SequelizeRepository as SequelizeCompanySettingRepository } from "../../repository/company-setting/sequelize-company-setting.repository";
import { CompanySettingUseCase } from "../../../application/company-setting/company-setting-use-case";
import { CompanySettingController } from "../../controller/company-setting/company-setting.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureCompanySettingRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanySettingRepository = new SequelizeCompanySettingRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companySettingUseCase = new CompanySettingUseCase(sequelizeCompanySettingRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companySettingCtrl = new CompanySettingController(companySettingUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/companies-settings/:cmp_uuid/:filter?/:page?/:perPage?`, companySettingCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, companySettingCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/company-setting`, authMiddleware, companySettingCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/company-setting/:cmp_uuid/:cmps_uuid`, authMiddleware, companySettingCtrl.deleteCtrl);
}

export default configureCompanySettingRoutes;
