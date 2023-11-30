import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../database/index';
import { Movie } from '../interfaces/movie.interface';
import { GenreModel } from './genre.model';
import { MpaaRatingModel } from './mpaa_rating.model';
import { DistributorModel } from './distributor.model';


export class MovieModel extends Model<Movie> implements Movie {
    public movie_id!: number;
    public release_date: Date;
    public title: string;
    public production_budget: number;
    public domestic_gross: number;
    public worldwide_gross: number;

    public genre_id: number;
    public mpaa_rating_id: number;
    public distributor_id: number;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

MovieModel.init(
    {
        movie_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        production_budget: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        domestic_gross: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        worldwide_gross: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        genre_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: GenreModel,
                key: 'id',
            },
        },
        mpaa_rating_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: MpaaRatingModel,
                key: 'id',
            },
        },
        distributor_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: DistributorModel,
                key: 'id',
            },
        },
    },
    {
        tableName: 'Movies',
        sequelize: sequelizeConnection,
        paranoid: true,
    }
);

MovieModel.belongsTo(GenreModel, { foreignKey: 'genre_id' });
MovieModel.belongsTo(DistributorModel, { foreignKey: 'distributor_id' });
MovieModel.belongsTo(MpaaRatingModel, { foreignKey: 'mpaa_rating_id' });

GenreModel.hasMany(MovieModel, { foreignKey: 'genre_id' });
DistributorModel.hasMany(MovieModel, { foreignKey: 'distributor_id' });
MpaaRatingModel.hasMany(MovieModel, { foreignKey: 'mpaa_rating_id' });


export default MovieModel;
