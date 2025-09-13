import express, {} from 'express';
import { AppDataSource } from './data-source.js';
import userControllers from './controllers/user.js';
const ap = express();
ap.use(express.json());
ap.use('/', userControllers);
AppDataSource.initialize() // teste conexão com DB!
    .then(() => { console.log("ok! - db"); }).catch((error) => { console.log(error); });
ap.listen(3000, () => { console.log("3000 -> ok!"); });
//ap.get("/",( req:Request, res:Response )=>{ res.send( "Oi, legal!" ) })
//# sourceMappingURL=index.js.map