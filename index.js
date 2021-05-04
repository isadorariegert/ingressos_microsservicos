const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const ingressosPorClienteId = {};


app.put('/clientes/:id/ingressos', (req, res) => {
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL 
    const ingressosDoCliente = ingressosPorClienteId[req.params.id] || [];
    ingressosDoCliente.push({ id: idObs, texto });
    ingressosPorClienteId[req.params.id] = ingressosDoCliente;
    res.status(201).send(ingressosDoCliente);
});

app.get('/clientes/:id/ingressos', (req, res) => {
    res.send(ingressosPorClienteId[req.params.id] || []);
});

app.listen(5000, () => {
    console.log('Porta 5000: ingressos')
});