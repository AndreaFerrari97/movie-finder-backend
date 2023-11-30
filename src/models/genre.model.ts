import { Genre } from 'interfaces/genre.interface';
import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../database/index';

export class GenreModel extends Model<Genre> implements Genre {
    public genre_id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

GenreModel.init(
    {
        genre_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'Genres',
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

export default GenreModel;
