import express, {} from 'express';
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/user.js";
const router = express.Router();
router.post("/user", async (req, res) => {
    try {
        var data = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const existing = await userRepository.findOne({ where: { email: data.email } });
        if (existing) {
            res.status(400).json({ msg: "Já existe, usuário cadastrado!" });
            return;
        }
        const novoUser = userRepository.create(data);
        await userRepository.save(novoUser);
        console.log(novoUser);
        res.status(201).json({ novoUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Falhou!" });
        return;
    }
});
router.get("/users", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Listar, falhou!" });
    }
});
export default router;
//# sourceMappingURL=user.js.map