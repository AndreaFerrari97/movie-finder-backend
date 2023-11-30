import { Model, DataTypes } from 'sequelize';
import sequelizeConnection from '../database/index';
import { User } from '../interfaces/user.interface'

export class UserModel extends Model<User> implements User {
    public id!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

UserModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: new DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Users',
    sequelize: sequelizeConnection
});

export default UserModel;