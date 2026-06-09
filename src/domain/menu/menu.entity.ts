export interface MenuEntity {
    mnu_uuid: string,
    mnu_parent_uuid: string,
    mnu_title: string,
    mnu_description: string,
    mnu_icon: string,
    mnu_route: string,
    mnu_order: number,
    mnu_itemactive: boolean,
    mnu_active: boolean,
    mnu_showifcompanyactive: boolean,
    mnu_createdat: Date,
    mnu_updatedat: Date,
}

export interface MenuItemTree extends MenuEntity {
    items?: MenuItemTree[];
}

//Update
export type MenuUpdateData = Pick<MenuEntity, 'mnu_parent_uuid' | 'mnu_title' | 'mnu_description' | 'mnu_icon' | 'mnu_route' | 'mnu_order' | 'mnu_itemactive' | 'mnu_active' | 'mnu_showifcompanyactive'>;