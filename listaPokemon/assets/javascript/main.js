const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')

const limit = 10
let offset = 0
const maxRecords = 151

function loadPokemon(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                        <span class="number">${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>

                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>

                    </li>
            ` ).join('')
        pokemonList.innerHTML += newHTML
})
}

loadPokemon(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecords = offset + limit

    if (qtdRecords >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemon(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
    } else {
        loadPokemon(offset, limit)
    }
})