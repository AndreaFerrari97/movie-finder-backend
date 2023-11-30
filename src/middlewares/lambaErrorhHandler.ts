import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { BadRequestError } from './badRequestError';

export const lambdaErrorHandler = (handler: (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>): APIGatewayProxyHandler => {
    return async (event, context) => {
        try {
            return await handler(event, context);
        } catch (error) {

            let statusCode = 500;
            let errorMessage = 'Internal server error';

            if (error instanceof BadRequestError) {
                statusCode = 400;
                errorMessage = error.message;

            }
            console.error(`Error occurred with status code ${statusCode} and message: ${errorMessage}`);
            return {
                statusCode: statusCode,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: errorMessage }),
            };
        }
    };
};

