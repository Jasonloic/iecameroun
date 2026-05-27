import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database';

export class Admin extends Model<
InferAttributes<Admin>,
InferCreationAttributes<Admin>
> {
    declare id: CreationOptional<number>;
declare nom: string;
declare email: string;
declare motDePasse: string;
declare role: CreationOptional<'admin' | 'editeur'>;
declare estActif: CreationOptional<boolean>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;

async verifierMotDePasse(candidat: string): Promise<boolean> {
    return bcrypt.compare(candidat, this.motDePasse);
}
}

Admin.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        nom: { type: DataTypes.STRING(150), allowNull: false },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        motDePasse: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.ENUM('admin', 'editeur'), defaultValue: 'editeur' },
        estActif: { type: DataTypes.BOOLEAN, defaultValue: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'admins' }
);

Admin.beforeCreate(async (admin) => {
    admin.motDePasse = await bcrypt.hash(admin.motDePasse, 12);
});

Admin.beforeUpdate(async (admin) => {
    if (admin.changed('motDePasse')) {
        admin.motDePasse = await bcrypt.hash(admin.motDePasse, 12);
    }
});