import * as bcrypt from 'bcrypt';
import {
    ICreateUsers,
    ICreateUsersResult,
    ILoginResult,
    ILoginUser,
    IUser
} from 'interfaces/IUsers';
import { sign } from '../middleware/auth';
import UsersSchema, { IUsers } from '../models/userModel';

export class UsersController {
    private Users = UsersSchema;

    public async createUser(createUser: ICreateUsers): Promise<ICreateUsersResult> {
        try {
            const user = await this.Users.findOne({ email: createUser.email }).exec();

            if (user) {
                const result: ICreateUsersResult = {
                    result: false
                }

                return result;
            };

            const hash = bcrypt.hashSync(createUser.password, 10);

            const newUser = await new this.Users({
                name_lastname: createUser.name_lastname,
                email: createUser.email,
                password: hash
            }).save();

            if (newUser == null) {
                const result: ICreateUsersResult = {
                    result: false
                }

                return result;
            }

            const result: ICreateUsersResult = {
                result: true
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async login(loginUser: ILoginUser): Promise<ILoginResult> {
        try {
            const user = await this.Users.findOne({ email: loginUser.email }).exec();

            if (!user) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            };

            const resultPassword = bcrypt.compareSync(loginUser.password, user.password);

            if (!resultPassword) {
                const result: ILoginResult = {
                    result: false,
                    token: null,
                    user: null
                }

                return result;
            }

            const resultUser: IUser = {
                _id: user._id,
                name_lastname: user.name_lastname,
                email: user.email
            }

            const token = sign(resultUser);

            const result: ILoginResult = {
                result: true,
                token: token,
                user: resultUser
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}