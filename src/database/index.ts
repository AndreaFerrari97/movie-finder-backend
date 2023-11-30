import { Sequelize } from 'sequelize';

let sequelizeInstance;

function getSequelizeInstance() {
    if (!sequelizeInstance) {
        sequelizeInstance = new Sequelize("movie_finder", "admin", "admin-movie-finder-2023", {
            dialect: 'mysql',
            host: "movie-finder-dev-instance-1.c2qxybbcai44.eu-central-1.rds.amazonaws.com",
            port: 3306,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        sequelizeInstance.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    return sequelizeInstance;
}

const sequelizeConnection = getSequelizeInstance();

export default sequelizeConnection;
