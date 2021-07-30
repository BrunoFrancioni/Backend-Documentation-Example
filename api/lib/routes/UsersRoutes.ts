import { Request, Response } from "express";
import { UsersController } from "../controllers/UsersController";
import { ICreateUsersResult, ILoginResult } from "interfaces/IUsers";

export class UsersRoutes {
    private usersController: UsersController = new UsersController();

    public routes(app): void {
        app.route('/users/signup')
            .post(async (req: Request, res: Response) => {
                try {
                    const result: ICreateUsersResult = await this.usersController
                        .createUser(req.body.createUser);

                    if (result.result) {
                        return res.status(201).json({
                            message: 'User Created Successfully'
                        });
                    } else {
                        return res.status(400).json({
                            message: 'User already exists'
                        });
                    }
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Error'
                    });
                }
            });

        app.route('/users/login')
            .post(async (req: Request, res: Response) => {
                try {
                    const result: ILoginResult = await this.usersController
                        .login(req.body.loginUser);

                    if (!result.result) {
                        return res.status(400).json({
                            message: 'Email or password incorrect.'
                        });
                    } else {
                        return res.status(200).json({
                            token: result.token,
                            user: result.user
                        });
                    }
                } catch (e) {
                    console.log(e);

                    return res.status(500).json({
                        message: 'Error'
                    });
                }
            });
    }
}