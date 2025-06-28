const express = require('express');
const { stat } = require('fs');
const router = express.Router();

const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const path = require('path');

const file = path.resolve(__dirname, '..', 'data', 'tarefas.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { defaultData: [] });

async function initDB() {
    await db.read();
    if (!db.data) {
        db.data = []; // se o db ainda não existe
        await db.write();
    }
}

// Rota GET - listar todos
router.get("/", async (req, res) => {
    await initDB();
    res.json(db.data);
});

// Rota POST - grava nova tarefa
router.post("/", async (req, res) => {
    const { titulo, descricao, agendarPara, status } = req.body;

    if (!titulo || titulo.trim() === '' ||
        !descricao || descricao.trim() === '') {
        return res.status(400).json({ erro: "Título e descrição são obrigatórios!" });
    }

    await initDB();

    db.data = db.data || [];
    const idsExistentes = db.data.map(tarefa => tarefa.id);
    const ultimoId = idsExistentes.length > 0 ? Math.max(...idsExistentes) : 0;
    const novoId = ultimoId + 1;


    const novaTarefa = {
        id: novoId,
        titulo,
        descricao,
        agendarPara: agendarPara || null,
        status: status || "pendente"
    };

    db.data.push(novaTarefa);
    await db.write();

    res.status(201).json({ mensagem: "Tarefa criada com sucesso!", novaTarefa });
});


// Rota DELETE - excluir pelo ID
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await initDB();

    const tarefasAntes = db.data.length;
    db.data = db.data.filter(tarefa => tarefa.id !== id);
    const tarefasDepois = db.data.length;

    if (tarefasAntes === tarefasDepois) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    await db.write();
    res.json({ mensagem: "Tarefa deletada com sucesso!" });
});

// Rota ATUALIZAR - atualizar dados


router.put("/:id", async (req, res) => {
    await initDB();

    const { titulo, descricao, agendarPara, status } = req.body;
    const id = parseInt(req.params.id, 10);

    if (!titulo || titulo.trim() === '' || !descricao || descricao.trim() === '') {
        return res.status(400).json({ erro: "Título e descrição são obrigatórios!" });
    }

    const index = db.data.findIndex(tarefa => tarefa.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: "Tarefa não encontrada!" });
    }

    db.data[index] = {
        id,
        titulo,
        descricao,
        agendarPara,
        status
    };

    await db.write();
    res.status(200).json({ mensagem: "Tarefa atualizada com sucesso!" });
});


module.exports = router;
