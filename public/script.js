function carregaJogadores() {
    fetch('https://api-pessoas-0477.onrender.com/pessoas')
        .then(res => res.json())
        .then(pessoas => {
            pessoas.forEach(pessoa => criarCard(pessoa))
        });
}

function criarCard(pessoa) {
    document.getElementById('agrupador-de-cards').innerHTML += `
        <article class="article-jogador d-flex flex-row gap-3 align-items-center col-5 rounded-3">
            <div class="m-2">
                <h2>${pessoa.nome}</h2>
                <p>ID: ${pessoa.id}</p>
                <p>Idade: ${pessoa.idade}</p>
                <p>Camisa: ${pessoa.camisa}</p>
                <p>Posição: ${pessoa["posição"]}</p>
                <p>Gols: ${pessoa.gols}</p>
                <p>Assistências: ${pessoa["assistências"]}</p>
            </div>
        </article>`;

}

document.addEventListener('DOMContentLoaded', carregaJogadores);

//fazer posts pelo forms
function enviarFormulario(event) {
    event.preventDefault();
    const nome = document.getElementById('postnome').value;
    const idade = document.getElementById('postidade').value;
    const camisa = document.getElementById('postcamisa').value;
    const posicao = document.getElementById('postposicao').value;
    const gols = document.getElementById('postgols').value;
    const assistencias = document.getElementById('postassistencias').value;

    const jogador = {
        nome,
        idade,
        camisa,
        "posição": posicao,
        gols,
        "assistências": assistencias
    };

    fetch('https://api-pessoas-0477.onrender.com/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogador)
    })
        .then(res => res.json())
        .then(data => {
            console.log('Jogador adicionado:', data);
            criarCard(data);
            setTimeout(location.reload(), 5000) //má prática
        })


}

function removerJogador(event) {
    event.preventDefault(); //n recarrega a pagina ao enviar o forms, trata com JS
    const id = document.getElementById('id-remover').value;

    fetch(`https://api-pessoas-0477.onrender.com/pessoas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                alert('Jogador removido com sucesso');
                location.reload()
            }
            else {
                alert('Erro ao remover jogador')
            }
        })
        .catch(() => {
            alert('Erro de conexão com a api')
        })
}

function editarJogador(event) {
    event.preventDefault();
    const id = document.getElementById('putid').value

    const nome = document.getElementById('putnome').value;
    const idade = document.getElementById('putidade').value;
    const camisa = document.getElementById('putcamisa').value;
    const posicao = document.getElementById('putposicao').value;
    const gols = document.getElementById('putgols').value;
    const assistencias = document.getElementById('putassistencias').value;

    const jogador = {};
    if (nome) jogador.nome = nome;
    if (idade) jogador.idade = idade;
    if (camisa) jogador.camisa = camisa;
    if (posicao) jogador["posição"] = posicao;
    if (gols) jogador.gols = gols;
    if (assistencias) jogador["assistências"] = assistencias;

    fetch(`https://api-pessoas-0477.onrender.com/pessoas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jogador)
    })
        .then(res => {
            if (res.ok) {
                console.log("Dados alterados com sucesso!")
                location.reload()
            }
        })

}

//funcções interativas

function f5() {
    //simula F5
    location.reload();
}

function quero_adicionar(idsection) {
    const forms_adicao = document.getElementById(idsection);
    if (forms_adicao.classList.contains('d-none')) {
        forms_adicao.classList.remove('d-none');
    }
    else {
        forms_adicao.classList.add('d-none')
    }
}

//pesquisa
