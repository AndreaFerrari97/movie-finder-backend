import * as bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface'
import { UserModel } from '../models/user.model';

export const checkUserExists = async (email: string): Promise<boolean> => {
    const existingUser = await UserModel.findOne({ where: { email } });
    return !!existingUser;
};

export const createUser = async (email: string, password: string): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ email, password: hashedPassword });
    return newUser;
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) { return null; }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) { return null; }

    return user;
};
