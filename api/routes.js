import express from 'express';
import Cidade from './models/Cidade.mjs';

const router = express.Router();

/* ROTAS CIDADE */
router.get('/cidades', async (req, res) => {
    try {
        const cidades = await Cidade.get();
        res.json(cidades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar cidades.' });
    }
});
router.post('/cidades', async (req, res) => {
    const { nome, uf } = req.body;
    try {
        const cidade = new Cidade(null, nome, uf);
        await cidade.create();
        res.status(201).json({ message: 'Cidade criada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar cidade.' });
    }
});
router.delete('/cidades/:id', async (req, res) => {
    const cidadeId = req.params.id;
    try {
        const cidade = new Cidade(cidadeId, null, null);
        await cidade.delete();
        res.json({ message: 'Cidade deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar cidade.' });
    }
});
router.put('/cidades/:id', async (req, res) => {
    const cidadeId = req.params.id;
    const { nome, uf } = req.body;
    try {
        const cidade = new Cidade(cidadeId, nome, uf);
        await cidade.update();
        res.json({ message: 'Cidade atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar cidade.' });
    }
});

export default router;
