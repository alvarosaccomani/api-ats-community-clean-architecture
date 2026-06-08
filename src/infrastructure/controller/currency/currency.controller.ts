import { Request, Response } from "express";
import { CurrencyUseCase } from "../../../application/currency/currency-use-case";
import SocketAdapter from "../../services/socketAdapter";
import { paginator } from "../../services/paginator.service";

export class CurrencyController {
    constructor(private currencyUseCase: CurrencyUseCase, private socketAdapter: SocketAdapter) {
        this.getAllCtrl = this.getAllCtrl.bind(this);
        this.getCtrl = this.getCtrl.bind(this);
        this.insertCtrl = this.insertCtrl.bind(this);
        this.updateCtrl = this.updateCtrl.bind(this);
        this.deleteCtrl = this.deleteCtrl.bind(this);
    }

    public async getAllCtrl(req: Request, res: Response) {
        try {
            const page = (req.params.page ? parseInt(req.params.page) : null);
            const perPage = (req.params.perPage ? parseInt(req.params.perPage) : null);
            if (page && perPage) {
                const currencies = await this.currencyUseCase.getCurrencies()
                return res.status(200).send({
                    success: true,
                    message: 'Monedas retornadas.',
                    ...paginator(currencies, page, perPage)
                });
            } else {
                const currencies = await this.currencyUseCase.getCurrencies()
                return res.status(200).send({
                    success: true,
                    message: 'Monedas retornadas.',
                    data: currencies
                });
            }
        } catch (error: any) {
            console.error('Error en getAllCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar las monedas.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async getCtrl(req: Request, res: Response) {
        try {
            const cur_uuid = req.params.cur_uuid;
            if(!cur_uuid || cur_uuid.toLowerCase() === 'null' || cur_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo recuperar la moneda.',
                    error: 'Debe proporcionar un Id de moneda.'
                });
            }
            const currency = await this.currencyUseCase.getDetailCurrency(`${cur_uuid}`)
            return res.status(200).send({
                success: true,
                message: 'Moneda retornada.',
                data: currency
            });
        } catch (error: any) {
            console.error('Error en getCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo recuperar la moneda.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async insertCtrl({ body }: Request, res: Response) {
        try {
            const cur_code = body.cur_code;
            const cur_name = body.cur_name;
            if(!cur_name || cur_name.toLowerCase() === 'null' || cur_name.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la moneda.',
                    error: 'Debe proporcionar un nombre para la moneda.'
                });
            }
            if(!cur_code || cur_code.toLowerCase() === 'null' || cur_code.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo insertar la moneda.',
                    error: 'Debe proporcionar un codigo para la moneda.'
                });
            }
            const currency = await this.currencyUseCase.createCurrency(body)
            return res.status(200).json({
                success: true,
                message: 'Moneda insertada.',
                data: currency
            });
        } catch (error: any) {
            console.error('Error en insertCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo insertar la moneda.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async updateCtrl(req: Request, res: Response) {
        try {
            const cur_uuid = req.params.cur_uuid;
            const update = req.body;
            if(!cur_uuid || cur_uuid.toLowerCase() === 'null' || cur_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo actualizar la moneda.',
                    error: 'Debe proporcionar un Id de moneda.'
                });
            }
            const currency = await this.currencyUseCase.updateCurrency(update)
            return res.status(200).json({
                success: true,
                message: 'Moneda actualizada.',
                data: currency
            });
        } catch (error: any) {
            console.error('Error en updateCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo actualizar la moneda.',
                error: error.message, // Mensaje claro del error
            });
        }
    }

    public async deleteCtrl(req: Request, res: Response) {
        try {
            const cur_uuid = req.params.cur_uuid;
            if(!cur_uuid || cur_uuid.toLowerCase() === 'null' || cur_uuid.toLowerCase() === 'undefined') {
                return res.status(400).json({
                    success: false,
                    message: 'No se pudo eliminar la moneda.',
                    error: 'Debe proporcionar un Id de moneda.'
                });
            };
            const currency = await this.currencyUseCase.deleteCurrency(cur_uuid)
            return res.status(200).json({
                success: true,
                message: 'Moneda eliminada.',
                data: currency
            });
        } catch (error: any) {
            console.error('Error en deleteCtrl (controller):', error.message);
            return res.status(400).json({
                success: false,
                message: 'No se pudo eliminar la moneda.',
                error: error.message, // Mensaje claro del error
            });
        }
    }
}