import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { ClaimEntity } from "../../../domain/claim/claim.entity";
import { SequelizeUser } from '../user/user.model';
import { SequelizeUnit } from '../unit/unit.model';
import { SequelizeSite } from '../site/site.model';
import { SequelizeSpace } from '../space/space.model';

export class SequelizeClaim extends Model<ClaimEntity, Omit<ClaimEntity, 'id'>> {
  declare cmp_uuid: string;
  declare cla_uuid: string;
  declare usr_uuid: string;
  declare uni_uuid: string | null;
  declare sit_uuid: string | null;
  declare spa_uuid: string | null;
  declare cla_title: string;
  declare cla_description: string;
  declare cla_type: 'Reclamo' | 'Sugerencia' | 'Propuesta';
  declare cla_status: 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado';
  declare cla_priority: 'Baja' | 'Media' | 'Alta';
  declare cla_createdat: Date;
  declare cla_updatedat: Date;
}

SequelizeClaim.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cla_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  usr_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uni_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sit_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  spa_uuid: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cla_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cla_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cla_type: {
    type: DataTypes.STRING, // 'Reclamo' | 'Sugerencia' | 'Propuesta'
    allowNull: false
  },
  cla_status: {
    type: DataTypes.STRING, // 'Abierto' | 'En Licitacion' | 'Aprobado' | 'En Obra' | 'FinalizadoAprobado' | 'Rechazado'
    allowNull: false,
    defaultValue: 'Abierto'
  },
  cla_priority: {
    type: DataTypes.STRING, // 'Baja' | 'Media' | 'Alta'
    allowNull: false,
    defaultValue: 'Media'
  },
  cla_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cla_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'cla_createdat',
  updatedAt: 'cla_updatedat',
  tableName: 'cla_claims'
});

SequelizeClaim.belongsTo(SequelizeUser, {
  as: 'usr',
  foreignKey: 'usr_uuid'
});
SequelizeClaim.belongsTo(SequelizeUnit, {
  as: 'unit',
  foreignKey: 'uni_uuid'
});
SequelizeClaim.belongsTo(SequelizeSite, {
  as: 'site',
  foreignKey: 'sit_uuid'
});
SequelizeClaim.belongsTo(SequelizeSpace, {
  as: 'space',
  foreignKey: 'spa_uuid'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeClaim.sync();
}
