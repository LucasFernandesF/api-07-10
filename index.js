const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json()); //suportar requisições


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'aula-7-10'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados.', err);
        return;
    }
    console.log('Banco de dados conectado com sucesso!');
});

app.post('/pedidos', (req, res) => {
    const { id_cliente, id_produto, quantidade, valor_total } = req.body;

    if (!id_cliente || !id_produto || !quantidade || !valor_total) {
        return res.status(400).json({ message: ' id_cliente, id_produto, quantidade, valor_total  são obrigatórios.' });
    }
    const query = 'INSERT INTO PEDIDOS(id_cliente, id_produto , quantidade, valor_total) VALUE(?,?,?,?)';
    db.query(query, [id_cliente, id_produto, quantidade, valor_total], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados.', err);
            return res.status(500).json({ message: 'Erro ao inserir dados.' });
        }
        res.status(201).json({ message: 'Pedido inserido com sucesso!', userID: result.insertID });
    });
});



app.post('/clientes', (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    if (!nome || !email || !telefone || !endereco) {
        return res.status(400).json({ message: 'Nome, E-mail, telefone e endereco são obrigatórios.' });
    }
    const query = 'INSERT INTO CLIENTES(nome, email, telefone, endereco) VALUE(?,?,?,?)';
    db.query(query, [nome, email, telefone, endereco], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados.', err);
            return res.status(500).json({ message: 'Erro ao inserir dados.' });
        }
        res.status(201).json({ message: 'Cliente inserido com sucesso!', userID: result.insertID });
    });
});

app.post('/pedidos', (req, res) => {
    const { id_cliente, id_produto, data_pedido, quantidade, valor_total } = req.body;

    // Validação de campos obrigatórios
    if (!id_cliente || !id_produto || !data_pedido || !quantidade || !valor_total) {
        return res.status(400).json({ message: 'data_pedido, quantidade, valor_total, id_cliente, id_produto são obrigatórios.' });
    }

    // Query para inserir dados com chaves estrangeiras
    const query = 'INSERT INTO PEDIDOS(id_cliente, id_produto, data_pedido, quantidade, valor_total) VALUES (?,?,?,?,?)';

    db.query(query, [id_cliente, id_produto, , quantidade, valor_total], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados.', err);
            return res.status(500).json({ message: 'Erro ao inserir dados.' });
        }
        res.status(201).json({ message: 'Pedido inserido com sucesso!', userID: result.insertId });
    });
});



//Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor em funcionamento na porta ${PORT}");
})