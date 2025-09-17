import express, { type Request, type Response } from 'express'
import cors from 'cors'
import {AppDataSource} from './data-source.js'
import userControllers from './controllers/user.js'
const ap = express()
ap.use(express.json())
ap.use(cors())
ap.use('/', userControllers)
AppDataSource.initialize() // teste conexão com DB!
.then(()=>{ console.log("ok! - db") }).catch((error)=>{ console.log(error) })
ap.listen(4000,()=>{ console.log( "4000 -> ok!" ) })
//ap.get("/",( req:Request, res:Response )=>{ res.send( "Oi, legal!" )
