var formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", function (e) {
    // Bloqueia o refresh da pagina
    e.preventDefault();

    var valorDigitado = document.getElementById("name").value;

    let urlAPI = " https://pokeapi.co/api/v2/pokemon/";
    urlAPI = (urlAPI + valorDigitado).toLowerCase();

    let containerImagemResposta = document.getElementById("imgPokemon");

    let containerinformacoesResposta = document.getElementById("informacaoPokemon");


    fetch(urlAPI)
        .then(resposta => resposta.json())
        .then(function (data) {
            let informacaoPokemon = 'Nome: ' + maiuscula(data.name) + '<br>';
            informacaoPokemon = informacaoPokemon + 'Tipo: ' + maiuscula(data.types[0].type.name);
            containerinformacoesResposta.innerHTML = informacaoPokemon;

            let imagemFrente = "<img src='" + data.sprites.front_default + "'>";
            let imagemCostas = "<img src='" + data.sprites.back_default + "'>";
            containerImagemResposta.innerHTML = imagemFrente + imagemCostas;
        })
        .catch(function (erro) {
            console.log(erro);
            if (erro == 'SyntaxError: Unexpected token N in JSON at position 0') {
                containerinformacoesResposta.innerHTML = "Pokémon não encontrado!";
            }
            else {
                containerinformacoesResposta.innerHTML = 'Erro: ' + erro;
            }
        })
})

function maiuscula(valor) {
    return valor[0].toUpperCase() + valor.substr(1);
}