import express, {} from 'express';
import { AppDataSource } from './data-source.js';
const ap = express();
AppDataSource.initialize()
    .then(() => {
    console.log("ok! - db");
}).catch((error) => { console.log(error); });
ap.listen(3000, () => { console.log("3000 -> ok!"); });
ap.get("/", (req, res) => { res.send("Oi, legal!"); });
//# sourceMappingURL=index.js.map