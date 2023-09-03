import express from 'express';
import Cidade from './models/Cidade.mjs';
import Bairro from './models/Bairro.mjs';
import Produto from './models/Produto.mjs';
import Pessoa from './models/Pessoa.mjs';

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
router.get('/cidades/:id', async (req, res) => {
    const cidadeId = req.params.id;
    try {
        const cidade = await Cidade.getById(cidadeId);
        res.json(cidade);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar cidade.' });
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

/* ROTAS PRODUTO */
router.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.get();
        res.json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar produtos.' });
    }
});
router.post('/produtos', async (req, res) => {
    const { nome, valor } = req.body;
    try {
        const produto = new Produto(null, nome, valor);
        await produto.create();
        res.status(201).json({ message: 'Produto criado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto.' });
    }
});
router.delete('/produtos/:id', async (req, res) => {
    const produtoId = req.params.id;
    try {
        const produto = new Produto(produtoId, null, null);
        await produto.delete();
        res.json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
});
router.put('/produtos/:id', async (req, res) => {
    const produtoId = req.params.id;
    const { nome, valor } = req.body;
    try {
        const produto = new Produto(produtoId, nome, valor);
        await produto.update();
        res.json({ message: 'Produto atualizado com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
});

/* ROTAS PESSOAS */
router.get('/pessoas', async (req, res) => {
    try {
        const pessoas = await Pessoa.get();
        res.json(pessoas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pessoas.' });
    }
});
router.post('/pessoas', async (req, res) => {
    const { nome, cidade_fk, bairro_fk, cep, endereco, numero, complemento, telefone, email } = req.body;
    try {
        const pessoa = new Pessoa(null, nome, cidade_fk, bairro_fk, cep, endereco, numero, complemento, telefone, email);
        await pessoa.create();
        res.status(201).json({ message: 'Pessoa criada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar pessoa.' });
    }
});
router.delete('/pessoas/:id', async (req, res) => {
    const pessoaId = req.params.id;
    try {
        const pessoa = new Pessoa(pessoaId, null, null, null, null, null, null, null, null, null);
        await pessoa.delete();
        res.json({ message: 'Pessoa deletada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar pessoa.' });
    }
});
router.put('/pessoas/:id', async (req, res) => {
    const pessoaId = req.params.id;
    const { nome, cidade_fk, bairro_fk, cep, endereco, numero, complemento, telefone, email } = req.body;
    try {
        const pessoa = new Pessoa(pessoaId, nome, cidade_fk, bairro_fk, cep, endereco, numero, complemento, telefone, email);
        await pessoa.update();
        res.json({ message: 'Pessoa atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
    }
});

export default router;
