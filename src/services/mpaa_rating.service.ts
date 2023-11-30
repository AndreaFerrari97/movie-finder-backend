import { MpaaRating } from "../interfaces/mpaa_rating";
import { MpaaRatingModel } from '../models/mpaa_rating.model';

export async function findAllMpaaRating(): Promise<MpaaRating[]> {
    try {
        return await MpaaRatingModel.findAll();
    } catch (error) {
        console.error('Error fetching MPAA ratings:', error);
        throw new Error('Unable to fetch MPAA ratings. Please try again later.');
    }
}