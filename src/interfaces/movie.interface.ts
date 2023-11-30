export interface Movie {
    movie_id: number;
    release_date: Date;
    title: string;
    production_budget: number;
    domestic_gross: number;
    worldwide_gross: number;
    genre_id: number;
    mpaa_rating_id: number;
    distributor_id: number;
}