import { Request, Response } from "express";
import { CompanySettingUseCase } from "../../../application/company-setting/company-setting-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanySettingController {
    constructor(private companySettingUseCase: CompanySettingUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const getCompaniesSettings = await this.companySettingUseCase.getCompaniesSettings(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Empresas configuraciones retornadas.',
                    ...paginator(getCompaniesSettings, page, perPage)
                });
            } else {
                const getCompaniesSettings = await this.companySettingUseCase.getCompaniesSettings(cmp_uuid)
                return res.status(200).send({
                    success: true,
                    message: 'Empresas configuraciones retornadas.',
                    data: getCompaniesSettings
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las empresas configuraciones.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cmps_uuid = req.params.cmps_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa configuración.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cmps_uuid || cmps_uuid.toLowerCase() === 'null' || cmps_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa configuración.',
                    error: 'Debe proporcionar un Id de company configuración.'
                });
            }
            const companySetting = await this.companySettingUseCase.getDetailCompanySetting(`${cmp_uuid}`, `${cmps_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Empresa configuración retornada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la empresa configuración.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_uuid = body.cmp_uuid;
            const cmps_uuid = body.cmps_uuid;
            const cmps_key = body.cmps_key;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            if(!cmps_key) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa configuración.',
                    error: 'Debe proporcionar un Nombre para la empresa.'
                })
            };
            const companyByKey = await this.companySettingUseCase.findCompanySettingByKey(cmp_uuid, cmps_uuid, cmps_key);
            if(companyByKey) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa configuración.',
                    error: `El key ${cmps_key} de empresa configuración ya existe.`
                });
            }
            const companySetting = await this.companySettingUseCase.createCompanySetting(body)
            return res.status(200).json({
                success: true,
                message: 'Empresa configuración insertada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la empresa.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cmps_uuid = req.params.cmps_uuid;
            const update = req.body;
            const companySetting = await this.companySettingUseCase.updateCompanySetting(cmp_uuid, cmps_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Empresa configuración actualizada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la empresa configuración.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            const cmps_uuid = req.params.cmps_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la empresa configuracion.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            const companySetting = await this.companySettingUseCase.deleteCompanySetting(cmp_uuid, cmps_uuid)
            return res.status(200).json({
                success: true,
                message: 'Empresa configuración eliminada.',
                data: companySetting
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la empresa.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}