import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { NotificationEntity } from "../../../domain/notification/notification.entity";

export class SequelizeNotification extends Model<NotificationEntity, Omit<NotificationEntity, 'id'>> {
  declare usr_uuid: string;
  declare ntf_uuid: string;
  declare cmp_uuid: string;
  declare ntf_title: string;
  declare ntf_message: string;
  declare ntf_type: string;
  declare ntf_isread: boolean;
  declare ntf_actionurl: string;   
  declare ntf_createdat: Date;
}

SequelizeNotification.init({
  usr_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  ntf_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ntf_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ntf_message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ntf_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ntf_isread: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ntf_actionurl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ntf_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'ntf_createdat',
  updatedAt: false,
  tableName: 'ntf_notifications'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeNotification.sync();
}
