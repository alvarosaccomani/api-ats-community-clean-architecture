import { Express } from "express";
import { SequelizeReservationRepository } from "../../repository/reservation/sequelize-reservation.repository";
import { ReservationUseCase } from "../../../application/reservation/reservation-use-case";
import { ReservationController } from "../../controller/reservation/reservation.controller";
import SocketAdapter from "../../services/socketAdapter";

function configureReservationRoutes(app: Express, socketAdapter: SocketAdapter) {
    const sequelizeResRepository = new SequelizeReservationRepository();
    const resUseCase = new ReservationUseCase(sequelizeResRepository);
    const resCtrl = new ReservationController(resUseCase, socketAdapter);
    
    app.get(`/${process.env.BASE_URL_API}/reservations-by-space/:cmp_uuid/:sit_uuid/:spa_uuid`, resCtrl.getBySpaceCtrl);
    app.get(`/${process.env.BASE_URL_API}/reservations-by-user/:cmp_uuid/:usr_uuid`, resCtrl.getByUserCtrl);
    app.get(`/${process.env.BASE_URL_API}/reservations/:cmp_uuid`, resCtrl.getByCompanyCtrl);
    app.get(`/${process.env.BASE_URL_API}/reservation/:cmp_uuid/:sit_uuid/:spa_uuid/:usr_uuid/:res_uuid`, resCtrl.getCtrl);
    app.post(`/${process.env.BASE_URL_API}/reservation`, resCtrl.insertCtrl);
    app.put(`/${process.env.BASE_URL_API}/reservation/:cmp_uuid/:sit_uuid/:spa_uuid/:usr_uuid/:res_uuid`, resCtrl.updateCtrl);
    app.delete(`/${process.env.BASE_URL_API}/reservation/:cmp_uuid/:sit_uuid/:spa_uuid/:usr_uuid/:res_uuid`, resCtrl.deleteCtrl);
}

export default configureReservationRoutes;
