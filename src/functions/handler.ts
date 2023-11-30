import { APIGatewayProxyHandler } from 'aws-lambda';
import * as movieService from '../services/movie.service'
import * as distributorService from '../services/distributor.service'
import * as mpaaRatingService from '../services/mpaa_rating.service'
import * as genreService from '../services/genre.service'
import { lambdaErrorHandler } from '../middlewares/lambaErrorhHandler';
require('dotenv').config();

const header = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
}
export const getAllMovies: APIGatewayProxyHandler = lambdaErrorHandler(async (event, _context) => {
  console.info("Received event: ", JSON.stringify(event));
  const queryParams = event.queryStringParameters || {};
  const data = await movieService.findAllMovie(queryParams);
  console.info(`Returning code 200 with total movies = ${data.movies.length}, current page = ${data.currentPage}, totalPages = ${data.totalPages}`);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: header,
  };
});

export const getAllDistributors: APIGatewayProxyHandler = lambdaErrorHandler(async (event, _context) => {
  console.info("Received event: ", JSON.stringify(event));
  const distributors = await distributorService.findAllDistributor();
  console.info(`Returning code 200 with total distributors = ${distributors.length}`);
  return {
    statusCode: 200,
    body: JSON.stringify(distributors),
    headers: header,
  };
});

export const getAllMpaaRatings: APIGatewayProxyHandler = lambdaErrorHandler(async (event, _context) => {
  console.info("Received event: ", JSON.stringify(event));
  const mpaaRating = await mpaaRatingService.findAllMpaaRating();
  console.info(`Returning code 200 with total mpaaRating = ${mpaaRating.length}`);
  return {
    statusCode: 200,
    body: JSON.stringify(mpaaRating),
    headers: header,
  };
});

export const getAllGenres: APIGatewayProxyHandler = async (event, _context) => {
  console.info("Received event: ", JSON.stringify(event));
  const genre = await genreService.findAllGenre();
  console.info(`Returning code 200 with total genre = ${genre.length}`);
  return {
    statusCode: 200,
    body: JSON.stringify(genre),
    headers: header,
  };
};

