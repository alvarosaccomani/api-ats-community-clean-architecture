import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { UnitEntity } from "../../../domain/unit/unit.entity";

export class SequelizeUnit extends Model<UnitEntity, Omit<UnitEntity, 'id'>> {
  declare cmp_uuid: string;
  declare uni_uuid: string;
  declare uni_code: string;
  declare uni_category: 'Residencial' | 'Comercial' | 'Socio Pleno' | 'Socio Deportivo' | 'Espacio Comun' | 'Parcela';
  declare uni_status: 'Activo' | 'Inactivo' | 'En_Mantenimiento';
  declare uni_financialcoefficient: number;
  declare uni_baseamountcustom: number;
  declare uni_locationdetails: string;
  declare uni_metadata?: Record<string, any>;
  declare uni_istransferable: boolean;
  declare uni_createdat: Date;
  declare uni_updatedat: Date;
}

SequelizeUnit.init({
  cmp_uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uni_uuid: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  uni_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uni_category: {
    type: DataTypes.STRING, // 'Residencial' | 'Comercial' | 'Socio Pleno' | 'Socio Deportivo' | 'Espacio Comun' | 'Parcela'
    allowNull: false
  },
  uni_status: {
    type: DataTypes.STRING, // 'Activo' | 'Inactivo' | 'En_Mantenimiento'
    allowNull: false,
    defaultValue: 'Activo'
  },
  uni_financialcoefficient: {
    type: DataTypes.DECIMAL(5, 4), // Ej: 0.1234 (coeficiente de copropiedad)
    allowNull: false,
    defaultValue: 1.0000
  },
  uni_baseamountcustom: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  uni_locationdetails: {
    type: DataTypes.STRING,
    allowNull: true
  },
  uni_metadata: {
    type: DataTypes.JSON,
    allowNull: true
  },
  uni_istransferable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  uni_createdat: {
    type: DataTypes.DATE,
    allowNull: true
  },
  uni_updatedat: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  createdAt: 'uni_createdat',
  updatedAt: 'uni_updatedat',
  tableName: 'uni_units'
});

// Sincronizar (solo en desarrollo)
if (process.env.NODE_ENV !== "production") {
    SequelizeUnit.sync();
}
