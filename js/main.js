import { getPokemonList, getPokemonDetails } from "./api/pokemon-api.js";
import { createPokemonCard } from "./components/pokemon-card.js";

const pokemonListElement = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreBtn");

const LIMIT = 12;

let offset = 0;

async function renderPokemonList() {
  try {
    setLoadingState(true);

    const pokemonList = await getPokemonList(LIMIT, offset);

    const pokemonDetailsPromises = pokemonList.map((pokemon) => {
      return getPokemonDetails(pokemon.url);
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    const pokemonCards = pokemonDetails
      .map((pokemon) => createPokemonCard(pokemon))
      .join("");

    pokemonListElement.insertAdjacentHTML("beforeend", pokemonCards);

    offset += LIMIT;
  } catch (error) {
    console.error(error);
    alert("Unable to load Pokémon.");
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(isLoading) {
  loadMoreButton.disabled = isLoading;
  loadMoreButton.textContent = isLoading ? "Loading..." : "Load More";
}

loadMoreButton.addEventListener("click", renderPokemonList);

renderPokemonList();
