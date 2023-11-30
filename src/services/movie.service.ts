import { MovieModel } from '../models/movie.model';
import { GenreModel } from '../models/genre.model';
import { MpaaRatingModel } from '../models/mpaa_rating.model';
import { DistributorModel } from '../models/distributor.model';
import { Op } from 'sequelize';
import { BadRequestError } from "../middlewares/badRequestError";

export async function findAllMovie(queryParams) {
    try {
        const { title, genre, distributor, mpaa, page, pagesize } = queryParams;

        const pageNumber = parseInt(page, 10) || 1;
        const pageSizeNumber = parseInt(pagesize, 10) || 50;
        let offset = (pageNumber - 1) * pageSizeNumber;

        if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
            throw new BadRequestError("Invalid page or pagesize value");
        }
        const whereClause = {};
        const include = [];

        if (title) {
            whereClause["title"] = { [Op.like]: `%${title}%` }; // Case-insensitive partial match
        }

        if (genre) {
            include.push({
                model: GenreModel,
                as: 'GenreModel',
                where: { genre_id: parseInt(genre) }
            });
        }
        if (distributor) {
            include.push({
                model: DistributorModel,
                as: 'DistributorModel',
                where: { distributor_id: parseInt(distributor) }
            });
        }
        if (mpaa) {
            include.push({
                model: MpaaRatingModel,
                as: 'MpaaRatingModel',
                where: { mpaa_rating_id: parseInt(mpaa) }
            });
        }

        const movies = await MovieModel.findAll({
            where: whereClause,
            include: include,
            limit: pageSizeNumber,
            offset: offset
        });

        const totalMovies = await MovieModel.count({
            where: whereClause,
            include: include
        });

        return {
            movies: movies,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalMovies / pageSizeNumber),
            totalItems: totalMovies
        };
    }
    catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('An error occurred while fetching movies. Please try again later.');
    }
}
