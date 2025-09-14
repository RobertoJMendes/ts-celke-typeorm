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
router.get("/users",async(req:Request, res:Response)=>{
    try {
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Listar, falhou!"})
    }
})
router.get("/users/:id",async(req:Request, res:Response)=>{
    try {
        let idUser = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where:idUser})
        if(!user){
            res.status(404).json({msg:"Falhou!"})
            return
        }
        res.status(200).json({user, msg:"Ok!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Listar, falhou!"})
    }
})
// Editar usuário!
router.put("/users/:id", async( req:Request, res:Response)=>{
    try{
        let idUser = req.params
        var data = req.body
        if(!req.body.name || "" ){
            res.status(400).json({msg:"Preencher campo Nome!"})
            return
        }
        if(!req.body.email || "" ){
            res.status(400).json({msg:"Preencher campos e-mail!"})
            return
        }
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where:idUser})
        console.log({user})
        if(!user){
            res.status(404).json({user,msg:"Usuário não cadastrado!"})
            return
        }
        // Verificar se já existe outro usuário com o mesmo e-mail, mas q não seja o atual!
        const existing = await userRepository.findOne({
            where:{
                email:data.email}})
                if(existing){
                    res.status(404).json({msg:"Usuário, já existe cadastrado!"})
                    return
                }
                // Atualiza os dados do usuário
                await userRepository.merge(user, data)
                const updateUser = await userRepository.save(user)
                res.status(200).json({updateUser:user, msg:"Usuário Atualizado!"})
            }catch(error){
                console.log(error)
                res.status(500).json({msg:"Falhou!"})
                return
            }
        })
router.delete("/users/:id",async(req:Request, res:Response)=>{
    try {
        let idUser = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where:idUser})
        if(!user){
            res.status(404).json({msg:"Falhou!"})
            return
        }
        const deleteUser = await userRepository.remove(user)
        res.status(200).json({deleteUser, msg:"Ok!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"Falhou, tente novamente!"})
    }
})
export default router