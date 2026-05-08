import {
  getPokemonList,
  getPokemonDetails,
  getPokemonByType,
} from "./api/pokemon-api.js";

import { createPokemonCard } from "./components/pokemon-card.js";

const pokemonListElement = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreBtn");
const categoryButtons = document.querySelectorAll("[data-type]");
const clearFilterButton = document.querySelector("#clearFilterBtn");
const pokedexSubtitle = document.querySelector("#pokedexSubtitle");

const LIMIT = 12;

let offset = 0;
let isFiltering = false;

async function renderPokemonList() {
  try {
    setLoadingState(true);

    const pokemonList = await getPokemonList(LIMIT, offset);
    const pokemonDetails = await getPokemonDetailsList(pokemonList);

    renderPokemonCards(pokemonDetails);

    offset += LIMIT;
  } catch (error) {
    handleRenderError(error);
  } finally {
    setLoadingState(false);
  }
}

async function renderPokemonByType(type) {
  try {
    isFiltering = true;

    setLoadingState(true);
    clearPokemonList();

    pokedexSubtitle.textContent = `Showing Pokémon of type ${type}.`;
    clearFilterButton.classList.remove("d-none");
    loadMoreButton.classList.add("d-none");

    const pokemonList = await getPokemonByType(type);

    const limitedPokemonList = pokemonList.slice(0, 24);
    const pokemonDetails = await getPokemonDetailsList(limitedPokemonList);

    renderPokemonCards(pokemonDetails);
  } catch (error) {
    handleRenderError(error);
  } finally {
    setLoadingState(false);
  }
}

async function getPokemonDetailsList(pokemonList) {
  const pokemonDetailsPromises = pokemonList.map((pokemon) => {
    return getPokemonDetails(pokemon.url);
  });

  return Promise.all(pokemonDetailsPromises);
}

function renderPokemonCards(pokemonDetails) {
  const pokemonCards = pokemonDetails
    .map((pokemon) => createPokemonCard(pokemon))
    .join("");

  pokemonListElement.insertAdjacentHTML("beforeend", pokemonCards);
}

function clearPokemonList() {
  pokemonListElement.innerHTML = "";
}

function clearFilter() {
  isFiltering = false;
  offset = 0;

  clearPokemonList();

  pokedexSubtitle.textContent = "Dynamic list loaded with JavaScript.";
  clearFilterButton.classList.add("d-none");
  loadMoreButton.classList.remove("d-none");

  renderPokemonList();
}

function setLoadingState(isLoading) {
  loadMoreButton.disabled = isLoading;
  loadMoreButton.textContent = isLoading ? "Loading..." : "Load More";

  categoryButtons.forEach((button) => {
    button.disabled = isLoading;
  });

  clearFilterButton.disabled = isLoading;
}

function handleRenderError(error) {
  console.error(error);
  alert("Unable to load Pokémon.");
}

loadMoreButton.addEventListener("click", renderPokemonList);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;

    renderPokemonByType(type);
  });
});

clearFilterButton.addEventListener("click", clearFilter);

renderPokemonList();
