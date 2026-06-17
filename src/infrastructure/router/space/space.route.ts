import { Express } from "express";
import { SequelizeSpaceRepository } from "../../repository/space/sequelize-space.repository";
import { SpaceUseCase } from "../../../application/space/space-use-case";
import { SpaceController } from "../../controller/space/space.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureSpaceRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeSpaceRepository = new SequelizeSpaceRepository();
    const spaceUseCase = new SpaceUseCase(sequelizeSpaceRepository);
    const spaceCtrl = new SpaceController(spaceUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/spaces-by-site/:cmp_uuid/:sit_uuid`, spaceCtrl.getBySiteCtrl);
    app.get(`/${process.env.BASE_URL_API}/spaces/:cmp_uuid`, spaceCtrl.getByCompanyCtrl);
    app.get(`/${process.env.BASE_URL_API}/space/:cmp_uuid/:sit_uuid/:spa_uuid`, spaceCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/space`, spaceCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/space/:cmp_uuid/:sit_uuid/:spa_uuid`, spaceCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/space/:cmp_uuid/:sit_uuid/:spa_uuid`, spaceCtrl.deleteCtrl);
}

export default configureSpaceRoutes;
