import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { MenuEntity } from "../../../domain/menu/menu.entity";

export class SequelizeMenu extends Model<MenuEntity, Omit<MenuEntity, 'id'>> {
  declare mnu_uuid: string;
  declare mnu_parent_uuid: string;
  declare mnu_title: string;
  declare mnu_description: string;
  declare mnu_icon: string;
  declare mnu_route: string;
  declare mnu_order: number;
  declare mnu_showifcompanyactive: boolean;
  declare mnu_itemactive: boolean;
  declare mnu_active: boolean;
  declare mnu_createdat: Date;
  declare mnu_updatedat: Date;
}

SequelizeMenu.init({
    mnu_uuid: { 
        type: DataTypes.STRING, 
        primaryKey: true 
    },
    mnu_parent_uuid: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    mnu_title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    mnu_description: { 
        type: DataTypes.STRING 
    },
    mnu_icon: { 
        type: DataTypes.STRING 
    },
    mnu_route: { 
        type: DataTypes.STRING 
    },
    mnu_order: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    mnu_showifcompanyactive: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    mnu_itemactive: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    mnu_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    mnu_createdat: { 
        type: DataTypes.DATE 
    },
    mnu_updatedat: { 
        type: DataTypes.DATE 
    }
}, {
    sequelize,
    timestamps: true,
    createdAt: 'mnu_createdat',
    updatedAt: 'mnu_updatedat',
    tableName: 'mnu_menus'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeMenu.sync();
}