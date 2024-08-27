const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="detalhes">
                    <p>Detalhes</p>
                    <div>
                        <span>HP</span>
                        <span id="hp" class="detalhe">${pokemon.hp}</span>
                    </div>
                    <br>
                    <div>
                        <span>Attack</span>
                        <span id="attack" class="detalhe">${pokemon.attack}</span>
                    </div>
                    <br>
                    <div>
                        <span>Defense</span>
                        <span id="defense" class="detalhe">${pokemon.defense}</span>
                    </div>
                    <br>
                    <div>
                        <span>speed</span>
                        <span id="speed" class="detalhe">${pokemon.speed}</span>
                    </div>
                    <br>
                    <div>
                        <span">Move</span>
                        <span id="move" class="detalhe">${pokemon.move}</span>
                    </div>
                    <br>
                    <div>
                        <span>especial</span>
                        <span id="especial" class="detalhe">${pokemon.especial}</span>
                    </div>
                </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
