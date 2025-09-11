import express, { type Request, type Response } from 'express'
import {AppDataSource} from './data-source.js'
const ap = express()
AppDataSource.initialize() // teste conexão com DB!
.then(()=>{ console.log("ok! - db") }).catch((error)=>{ console.log(error) })
ap.listen(3000,()=>{ console.log( "3000 -> ok!" ) })
ap.get("/",( req:Request, res:Response )=>{ res.send( "Oi, legal!" ) })