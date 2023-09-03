import express from 'express';
import Cidade from './models/Cidade.mjs';
import Bairro from './models/Bairro.mjs';

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

/* ROTAS BAIRRO */
router.get('/bairros', async (req, res) => {
    try {
        const bairros = await Bairro.get();
        res.json(bairros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar bairros.' });
    }
});
router.post('/bairros', async (req, res) => {
    const { nome } = req.body;
    try {
        const bairro = new Bairro(null, nome);
        await bairro.create();
        res.status(201).json({ message: 'Bairro criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar bairro.' });
    }
});
router.delete('/bairros/:id', async (req, res) => {
    const bairroId = req.params.id;
    try {
        const bairro = new Bairro(bairroId, null);
        await bairro.delete();
        res.json({ message: 'Bairro deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar bairro.' });
    }
});
router.put('/bairros/:id', async (req, res) => {
    const bairroId = req.params.id;
    const { nome } = req.body;
    try {
        const bairro = new Bairro(bairroId, nome);
        await bairro.update();
        res.json({ message: 'Bairro atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar bairro.' });
    }
});

export default router;
