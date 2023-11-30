import { MpaaRating } from 'interfaces/mpaa_rating';
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../database/index';

export class MpaaRatingModel extends Model<MpaaRating> implements MpaaRating {
    public mpaa_rating_id!: number;
    public rating!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

MpaaRatingModel.init(
    {
        mpaa_rating_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'MpaaRatings',
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default MpaaRatingModel;
