import express, { type Request, type Response } from 'express'
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/user.js";
const router = express.Router()
router.post("/user", async( req:Request, res:Response)=>{
    try{
        var data = req.body
        const userRepository = AppDataSource.getRepository(User)
        const existing = await userRepository.findOne({where:{email:data.email}})
        if(existing){
            res.status(400).json({msg:"Já existe, usuário cadastrado!"})
            return
        }
        const novoUser = userRepository.create(data)
        await userRepository.save(novoUser)
        console.log(novoUser)
        res.status(201).json({novoUser})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:"Falhou!"})
        return
    }
})
export default router