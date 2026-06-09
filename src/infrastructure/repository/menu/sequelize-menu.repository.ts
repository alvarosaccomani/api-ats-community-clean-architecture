import { MenuEntity, MenuUpdateData } from "../../../domain/menu/menu.entity";
import { MenuRepository } from "../../../domain/menu/menu.repository";
import { SequelizeMenu } from "../../model/menu/menu.model";

export class SequelizeRepository implements MenuRepository {
    async getMenus(): Promise<MenuEntity[] | null> {
        try {
            return await SequelizeMenu.findAll({ order: [['mnu_order', 'ASC']] });
        } catch (error: any) {
            console.error('Error en getMenus:', error.message);
            throw error;
        }
    }

    async findMenuById(mnu_uuid: string): Promise<MenuEntity | null> {
        try {
            return await SequelizeMenu.findByPk(mnu_uuid);
        } catch (error: any) {
            console.error('Error en findMenuById:', error.message);
            throw error;
        }
    }

    async createMenu(menu: MenuEntity): Promise<MenuEntity | null> {
        try {
            const result = await SequelizeMenu.create(menu as any);
            if (!result) throw new Error(`No se pudo insertar el menú.`);
            return result.dataValues;
        } catch (error: any) {
            console.error('Error en createMenu:', error.message);
            throw error;
        }
    }

    async updateMenu(mnu_uuid: string, menu: MenuUpdateData): Promise<MenuEntity | null> {
        try {
            await SequelizeMenu.update(menu, { where: { mnu_uuid } });
            return this.findMenuById(mnu_uuid);
        } catch (error: any) {
            console.error('Error en updateMenu:', error.message);
            throw error;
        }
    }

    async deleteMenu(mnu_uuid: string): Promise<MenuEntity | null> {
        try {
            const menu = await this.findMenuById(mnu_uuid);
            await SequelizeMenu.destroy({ where: { mnu_uuid } });
            return menu;
        } catch (error: any) {
            console.error('Error en deleteMenu:', error.message);
            throw error;
        }
    }

    async findMenuByTitle(mnu_title: string): Promise<MenuEntity | null> {
        try {
            return await SequelizeMenu.findOne({ where: { mnu_title } });
        } catch (error: any) {
            console.error('Error en findMenuByTitle:', error.message);
            throw error;
        }
    }

    async getMenuItems(): Promise<MenuEntity[] | null> {
        try {
            return await SequelizeMenu.findAll({ 
                where: { mnu_itemactive: true, mnu_active: true },
                order: [['mnu_order', 'ASC']] 
            });
        } catch (error: any) {
            console.error('Error en getMenuItems:', error.message);
            throw error;
        }
    }
}
