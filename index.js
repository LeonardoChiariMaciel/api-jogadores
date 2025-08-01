//isso permite que façamos alteracoes de outras maquinas
import cors from 'cors';
import express, { json } from 'express';
const app = express();
const port = 3000;

app.use(cors());
app.use(json());

const pessoas = [
    {
        id: 1,
        nome: "Leonardo",
        idade: 20,
        camisa: 7,
        posição: "PD",
        gols: 447,
        assistências: 226
    },
    {
        id: 2,
        nome: "Tiago",
        idade: 40,
        camisa: 8,
        posição: "MEI",
        gols: 389,
        assistências: 321
    },
    {
        id: 3,
        nome: "Júlio",
        idade: 40,
        camisa: 9,
        posição: "CA",
        gols: 629,
        assistências: 88
    },
    {
        id: 4,
        nome: "Matheus",
        idade: 25,
        camisa: 10,
        posição: "MC",
        gols: 205,
        assistências: 315
    },
    {
        id: 5,
        nome: "Emanuel",
        idade: 11,
        camisa: 7,
        posição: "VOL",
        gols: 97,
        assistências: 428
    }
];

//rota principal
app.get('/', (req, res) => {
    res.send("Seja bem vindo, adicione um '/pessoas' à URL para visualizar as pessoas cadastradas na API");
});

//rota para listar todas as pessoas
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
    const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
    if (pessoa) {
        res.json(pessoa);
    }
    else {
        res.status(404).json({ erro: 404 });
    }
});

//post -> adicionar nova pessoa
app.use(json()); //serve para posts e puts]

app.post('/pessoas', (req, res) => {
    const { nome, idade, camisa, posição, gols, assistências } = req.body;
    const novaPessoa = {
        id: pessoas.length ? pessoas[pessoas.length - 1].id + 1 : 1,
        nome,
        idade,
        camisa,
        posição,
        gols,
        assistências
    };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

//put -> atualizar info
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, camisa, posição, gols, assistências } = req.body;

    const pessoa = pessoas.find(p => p.id === parseInt(id));
    if (!pessoa) return res.status(404).json({ erro: 404 });
    if (nome) pessoa.nome = nome;
    if (idade) pessoa.idade = idade;
    if (camisa) pessoa.camisa = camisa;
    if (posição) pessoa.posição = posição;
    if (gols) pessoa.gols = gols;
    if (assistências) pessoa.assistências = assistências;


    res.json(pessoa);
})

app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        const pessoaRemovida = pessoas.splice(index, 1);
        res.status(200).json({ mensagem: "Pessoa removida com sucesso", pessoa: pessoaRemovida[0] });
    }
    else {
        console.log("404: ERRO AO ENCONTRAR A PESSOA")
    }
});

app.listen(port, () => {
    console.log('API rodando')
})

