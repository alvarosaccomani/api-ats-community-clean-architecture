import { Express } from "express";
import { SequelizeSiteRepository } from "../../repository/site/sequelize-site.repository";
import { SiteUseCase } from "../../../application/site/site-use-case";
import { SiteController } from "../../controller/site/site.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureSiteRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeSiteRepository = new SequelizeSiteRepository();
    const siteUseCase = new SiteUseCase(sequelizeSiteRepository);
    const siteCtrl = new SiteController(siteUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/sites/:cmp_uuid`, siteCtrl.getAllCtrl);
    app.get(`/${process.env.BASE_URL_API}/site/:cmp_uuid/:sit_uuid`, siteCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/site`, siteCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/site/:cmp_uuid/:sit_uuid`, siteCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/site/:cmp_uuid/:sit_uuid`, siteCtrl.deleteCtrl);
}

export default configureSiteRoutes;
