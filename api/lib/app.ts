import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
require('dotenv').config({ path: '.env' });
import { UsersRoutes } from "./routes/UsersRoutes";
import PhotosRoutes from "./routes/PhotosRoutes";
import PostsRoutes from "./routes/PostsRoutes";
class App {
    public app: express.Application;
    public mongoUrl = process.env.MONGO_DB_CONNECTION;

    public usersRoutes: UsersRoutes = new UsersRoutes();
    public postsRoutes: PostsRoutes = new PostsRoutes();
    public photosRoutes: PhotosRoutes = new PhotosRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();

        this.usersRoutes.routes(this.app);
        this.postsRoutes.routes(this.app);
        this.photosRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());

        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            }
        );

        mongoose.connection.on("error", err => {
            console.log("err", err)
        });

        mongoose.connection.on("connected", (err, res) => {
            console.log("mongoose is connected")
        });
    }
}

export default new App().app;