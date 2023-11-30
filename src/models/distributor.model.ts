import { Distributor } from 'interfaces/distributor.interface';
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../database/index';

export class DistributorModel extends Model<Distributor> implements Distributor {
    public distributor_id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

DistributorModel.init(
    {
        distributor_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'Distributors',
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default DistributorModel;
