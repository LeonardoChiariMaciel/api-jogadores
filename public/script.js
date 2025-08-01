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
            <img src="foto-perfil.jpg" class="foto-perfil col-2 ms-2 rounded-3">
            <div class="m-2">
                <h2>${pessoa.nome}</h2>
                <p>Idade: ${pessoa.idade}</p>
                <p>Camisa: ${pessoa.camisa}</p>
                <p>Posição: ${pessoa["posição"]}</p>
                <p>Gols: ${pessoa.gols}</p>
                <p>Assistências: ${pessoa["assistências"]}</p>
            </div>
        </article>`;
}

document.addEventListener('DOMContentLoaded', carregaJogadores);