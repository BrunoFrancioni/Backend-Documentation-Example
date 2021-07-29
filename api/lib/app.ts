import express, { Request, Response, NextFunction } from "express";
import PhotosRoutes from "./routes/PhotosRoutes";
import PostsRoutes from "./routes/PostsRoutes";
class App {
    public app: express.Application;

    public postsRoutes: PostsRoutes = new PostsRoutes();
    public photosRoutes: PhotosRoutes = new PhotosRoutes();

    constructor() {
        this.app = express();
        this.config();

        this.postsRoutes.routes(this.app);
        this.photosRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE, GET');
                return res.status(200).json({});
            }

            next();
        });
    }
}

export default new App().app;