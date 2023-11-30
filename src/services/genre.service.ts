import { Genre } from "../interfaces/genre.interface";
import { GenreModel } from '../models/genre.model';

export async function findAllGenre(): Promise<Genre[]> {
    try {
        return await GenreModel.findAll();
    } catch (error) {
        console.error('Error fetching Genre:', error);
        throw new Error('Unable to fetch Genre. Please try again later.');
    }
}