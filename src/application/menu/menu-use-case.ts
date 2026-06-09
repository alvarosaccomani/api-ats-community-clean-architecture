import { MenuRepository } from "../../domain/menu/menu.repository";
import { MenuValue } from "../../domain/menu/menu.value";
import { TimezoneConverter } from "../../infrastructure/utils/TimezoneConverter";

export class MenuUseCase {
    constructor(private readonly menuRepository: MenuRepository) {
        this.getMenus = this.getMenus.bind(this);
        this.getDetailMenu = this.getDetailMenu.bind(this);
        this.createMenu = this.createMenu.bind(this);
        this.updateMenu = this.updateMenu.bind(this);
        this.deleteMenu = this.deleteMenu.bind(this);
        this.getMenuItems = this.getMenuItems.bind(this);
    }

    public async getMenus() {
        try {
            const menus = await this.menuRepository.getMenus();
            if (!menus) throw new Error('No hay menús disponibles.');
            return menus.map(menu => ({
                mnu_uuid: menu.mnu_uuid,
                mnu_parent_uuid: menu.mnu_parent_uuid,
                mnu_title: menu.mnu_title,
                mnu_description: menu.mnu_description,
                mnu_icon: menu.mnu_icon,
                mnu_route: menu.mnu_route,
                mnu_order: menu.mnu_order,
                mnu_showifcompanyactive: menu.mnu_showifcompanyactive,
                mnu_itemactive: menu.mnu_itemactive,
                mnu_active: menu.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_updatedat, 'America/Buenos_Aires')
            }));
        } catch (error: any) {
            console.error('Error en getMenus (use case):', error.message);
            throw error;
        }
    }

    public async getDetailMenu(mnu_uuid: string) {
        try {
            const menu = await this.menuRepository.findMenuById(mnu_uuid);
            if (!menu) throw new Error(`No se encontró el menú con ID: ${mnu_uuid}`);
            return {
                mnu_uuid: menu.mnu_uuid,
                mnu_parent_uuid: menu.mnu_parent_uuid,
                mnu_title: menu.mnu_title,
                mnu_description: menu.mnu_description,
                mnu_icon: menu.mnu_icon,
                mnu_route: menu.mnu_route,
                mnu_order: menu.mnu_order,
                mnu_showifcompanyactive: menu.mnu_showifcompanyactive,
                mnu_itemactive: menu.mnu_itemactive,
                mnu_active: menu.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en getDetailMenu (use case):', error.message);
            throw error;
        }
    }

    public async createMenu(data: any) {
        try {
            const menuValue = new MenuValue(data);
            const menuCreated = await this.menuRepository.createMenu(menuValue);
            if (!menuCreated) throw new Error(`No se pudo insertar el menú.`);
            return {
                mnu_uuid: menuCreated.mnu_uuid,
                mnu_parent_uuid: menuCreated.mnu_parent_uuid,
                mnu_title: menuCreated.mnu_title,
                mnu_description: menuCreated.mnu_description,
                mnu_icon: menuCreated.mnu_icon,
                mnu_route: menuCreated.mnu_route,
                mnu_order: menuCreated.mnu_order,
                mnu_showifcompanyactive: menuCreated.mnu_showifcompanyactive,
                mnu_itemactive: menuCreated.mnu_itemactive,
                mnu_active: menuCreated.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menuCreated.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menuCreated.mnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en createMenu (use case):', error.message);
            throw error;
        }
    }

    public async updateMenu(mnu_uuid: string, data: any) {
        try {
            const menuUpdated = await this.menuRepository.updateMenu(mnu_uuid, data);
            if (!menuUpdated) throw new Error(`No se pudo actualizar el menú.`);
            return {
                mnu_uuid: menuUpdated.mnu_uuid,
                mnu_parent_uuid: menuUpdated.mnu_parent_uuid,
                mnu_title: menuUpdated.mnu_title,
                mnu_description: menuUpdated.mnu_description,
                mnu_icon: menuUpdated.mnu_icon,
                mnu_route: menuUpdated.mnu_route,
                mnu_order: menuUpdated.mnu_order,
                mnu_showifcompanyactive: menuUpdated.mnu_showifcompanyactive,
                mnu_itemactive: menuUpdated.mnu_itemactive,
                mnu_active: menuUpdated.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menuUpdated.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menuUpdated.mnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en updateMenu (use case):', error.message);
            throw error;
        }
    }

    public async deleteMenu(mnu_uuid: string) {
        try {
            const menuDeleted = await this.menuRepository.deleteMenu(mnu_uuid);
            if (!menuDeleted) throw new Error(`No se pudo eliminar el menú.`);
            return {
                mnu_uuid: menuDeleted.mnu_uuid,
                mnu_parent_uuid: menuDeleted.mnu_parent_uuid,
                mnu_title: menuDeleted.mnu_title,
                mnu_description: menuDeleted.mnu_description,
                mnu_icon: menuDeleted.mnu_icon,
                mnu_route: menuDeleted.mnu_route,
                mnu_order: menuDeleted.mnu_order,
                mnu_showifcompanyactive: menuDeleted.mnu_showifcompanyactive,
                mnu_itemactive: menuDeleted.mnu_itemactive,
                mnu_active: menuDeleted.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menuDeleted.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menuDeleted.mnu_updatedat, 'America/Buenos_Aires')
            };
        } catch (error: any) {
            console.error('Error en deleteMenu (use case):', error.message);
            throw error;
        }
    }

    public async getMenuItems() {
        try {
            const menus = await this.menuRepository.getMenuItems();
            if (!menus) throw new Error('No hay items de menú disponibles.');
            
            // Convertir a formato plano con timezones primero
            const flatMenus = menus.map((menu: any) => ({
                mnu_uuid: menu.mnu_uuid,
                mnu_parent_uuid: menu.mnu_parent_uuid,
                mnu_title: menu.mnu_title,
                mnu_description: menu.mnu_description,
                mnu_icon: menu.mnu_icon,
                mnu_route: menu.mnu_route,
                mnu_order: menu.mnu_order,
                mnu_showifcompanyactive: menu.mnu_showifcompanyactive,
                mnu_itemactive: menu.mnu_itemactive,
                mnu_active: menu.mnu_active,
                mnu_createdat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_createdat, 'America/Buenos_Aires'),
                mnu_updatedat: TimezoneConverter.toIsoStringInTimezone(menu.mnu_updatedat, 'America/Buenos_Aires'),
                items: [] as any[]
            }));

            // Construir el árbol
            return this.buildMenuTree(flatMenus);
        } catch (error: any) {
            console.error('Error en getMenuItems (use case):', error.message);
            throw error;
        }
    }

    private buildMenuTree(items: any[]): any[] {
        const rootItems: any[] = [];
        const lookup: { [key: string]: any } = {};

        for (const item of items) {
            lookup[item.mnu_uuid] = item;
        }

        for (const item of items) {
            if (item.mnu_parent_uuid && lookup[item.mnu_parent_uuid]) {
                lookup[item.mnu_parent_uuid].items.push(item);
            } else {
                rootItems.push(item);
            }
        }

        return rootItems;
    }
}
