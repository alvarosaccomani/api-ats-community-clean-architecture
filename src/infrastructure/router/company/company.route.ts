import { Express } from "express";
import { SequelizeRepository as SequelizeCompanyRepository } from "../../repository/company/sequelize-company.repository";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import { CompanyController } from "../../controller/company/company.controller";
import SocketAdapter from "../../services/socketAdapter";
import { authMiddleware } from "../../middleware/auth.middleware";

function configureCompanyRoutes(app: Express, socketAdapter: SocketAdapter) {
    /*
    *   Iniciar repository
    */
    
    const sequelizeCompanyRepository = new SequelizeCompanyRepository();
    
    /*
    *   Iniciar casos de uso
    */
    
    const companyUseCase = new CompanyUseCase(sequelizeCompanyRepository);
    
    /*
    *   Iniciar controller
    */
    
    const companyCtrl = new CompanyController(companyUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/companies/:filter?/:page?/:perPage?`, companyCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, companyCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/company`, authMiddleware, companyCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, authMiddleware, companyCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/company/:cmp_uuid`, authMiddleware, companyCtrl.deleteCtrl);
    app.get(`/${process.env.BASE_URL_API}/company-by-slug/:cmp_slug`, companyCtrl.getBySlugCtrl);
    app.get(`/${process.env.BASE_URL_API}/featured-companies`, companyCtrl.getFeaturedCompaniesCtrl);
}

export default configureCompanyRoutes;
