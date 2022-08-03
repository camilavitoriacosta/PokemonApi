var formulario = document.querySelector(".formulario");

formulario.addEventListener("submit", function (e) {
    // Bloqueia o refresh da pagina
    e.preventDefault();

    var valorDigitado = document.getElementById("name").value;

    let urlAPI = " https://pokeapi.co/api/v2/pokemon/";
    urlAPI = (urlAPI + valorDigitado).toLowerCase();


    fetch(urlAPI)
        .then(resposta => resposta.json())
        .then(function (data) {
            preencherInformacoesPokemon(data);
            preencherImagemPokemon(data);
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

function preencherInformacoesPokemon(data) {
    let informacaoPokemon = 'Nome: ' + maiuscula(data.name) + '<br>';
    informacaoPokemon = informacaoPokemon + 'Tipo: ' + maiuscula(data.types[0].type.name);

    let containerinformacoesResposta = document.getElementById("informacaoPokemon");
    containerinformacoesResposta.innerHTML = informacaoPokemon;
}

function preencherImagemPokemon() {
    let imagemFrente = "<img src='" + data.sprites.front_default + "'>";
    let imagemCostas = "<img src='" + data.sprites.back_default + "'>";

    let containerImagemResposta = document.getElementById("imgPokemon");
    containerImagemResposta.innerHTML = imagemFrente + imagemCostas;
}

function maiuscula(valor) {
    return valor[0].toUpperCase() + valor.substr(1);
}