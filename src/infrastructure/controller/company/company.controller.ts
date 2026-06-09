import { Request, Response } from "express";
import { CompanyUseCase } from "../../../application/company/company-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CompanyController {
    constructor(private companyUseCase: CompanyUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
        this.getBySlugCtrl = this.getBySlugCtrl.bind(this);
        this.getFeaturedCompaniesCtrl = this.getFeaturedCompaniesCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const company = await this.companyUseCase.getCompanies()
                return res.status(200).send({
                    success: true,
                    message: 'Empresas retornadas.',
                    ...paginator(company, page, perPage)
                });
            } else {
                const company = await this.companyUseCase.getCompanies()
                return res.status(200).send({
                    success: true,
                    message: 'Empresas retornadas.',
                    data: company
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las empresas.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid || cmp_uuid.toLowerCase() === 'null' || cmp_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa.',
                    error: 'Debe proporcionar un Id de company.'
                });
            }
            const company = await this.companyUseCase.getDetailCompany(`${cmp_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Empresa retornada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la empresa.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cmp_slug = body.cmp_slug;
            const cmp_name = body.cmp_name;
            if(!cmp_name) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa.',
                    error: 'Debe proporcionar un Nombre para la empresa.'
                })
            };
            const companyByName = await this.companyUseCase.findCompanyByName(cmp_name);
            if(companyByName) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa.',
                    error: `El nombre ${cmp_name} de empresa ya existe.`
                });
            }
            const companyBySlug = await this.companyUseCase.findCompanyBySlug(cmp_slug);
            if(companyBySlug) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la empresa.',
                    error: `El nombre ${cmp_slug} de empresa ya existe.`
                });
            }
            const company = await this.companyUseCase.createCompany(body)
            return res.status(200).json({
                success: true,
                message: 'Empresa insertada.',
                data: company
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
            const update = req.body;
            const company = await this.companyUseCase.updateCompany(cmp_uuid, update)
            return res.status(200).json({
                success: true,
                message: 'Empresa actualizada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la empresa.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cmp_uuid = req.params.cmp_uuid;
            if(!cmp_uuid) {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la empresa.',
                    error: 'Debe proporcionar un Id de company.'
                });
            };
            const company = await this.companyUseCase.deleteCompany(cmp_uuid)
            return res.status(200).json({
                success: true,
                message: 'Empresa eliminada.',
                data: company
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

    public async getBySlugCtrl(req: Request, res: Response) {
        try {
            const cmp_slug = req.params.cmp_slug;
            if(!cmp_slug || cmp_slug.toLowerCase() === 'null' || cmp_slug.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la empresa.',
                    error: 'Debe proporcionar un Slug de company.'
                });
            }
            const company = await this.companyUseCase.getCompanyBySlug(`${cmp_slug}`)
            return res.status(200).send({
                success: true,
                message: 'Empresa retornada.',
                data: company
            });
        } catch (error: any) {
            console.error('Error en getBySlugCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la empresa.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getFeaturedCompaniesCtrl(req: Request, res: Response) {
        try {
            const companies = await this.companyUseCase.getFeaturedCompanies()
            return res.status(200).send({
                success: true,
                message: 'Empresas destacadas retornadas.',
                data: companies
            });
        } catch (error: any) {
            console.error('Error en getFeaturedCompaniesCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las empresas destacadas.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}