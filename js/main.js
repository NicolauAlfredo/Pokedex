const pokemonList = document.querySelector("#pokemonList");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

let offset = 0;
const limit = 12;

async function fetchPokemonList() {
  const response = await fetch(
    `${API_BASE_URL}?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Error fetching Pokémon list");
  }

  const data = await response.json();

  return data.results;
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching Pokémon details");
  }

  return response.json();
}

function createPokemonCard(pokemon) {
  const pokemonTypes = pokemon.types
    .map((typeInfo) => {
      return `<span class="pokemon-type">${typeInfo.type.name}</span>`;
    })
    .join("");

  return `
    <article class="pokemon-card">
      <p class="pokemon-id">#${pokemon.id}</p>

      <img 
        src="${pokemon.sprites.front_default}" 
        alt="${pokemon.name}"
      />

      <h2 class="pokemon-name">${pokemon.name}</h2>

      <div class="pokemon-types">
        ${pokemonTypes}
      </div>
    </article>
  `;
}

async function renderPokemon() {
  try {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Loading...";

    const pokemonListData = await fetchPokemonList();

    const pokemonDetailsPromises = pokemonListData.map((pokemon) => {
      return fetchPokemonDetails(pokemon.url);
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    const pokemonCards = pokemonDetails
      .map((pokemon) => createPokemonCard(pokemon))
      .join("");

    pokemonList.insertAdjacentHTML("beforeend", pokemonCards);

    offset += limit;
  } catch (error) {
    console.error(error);
    alert("Unable to load Pokémon.");
  } finally {
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = "Load More";
  }
}

loadMoreBtn.addEventListener("click", renderPokemon);

renderPokemon();
