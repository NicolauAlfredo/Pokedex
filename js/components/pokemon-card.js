import { formatPokemonId, capitalizeText } from "../utils/format.js";

export function createPokemonCard(pokemon) {
  const types = pokemon.types
    .map((typeInfo) => {
      return `<span class="pokemon-type">${capitalizeText(typeInfo.type.name)}</span>`;
    })
    .join("");

  return `
    <article class="pokemon-card">
      <p class="pokemon-id">${formatPokemonId(pokemon.id)}</p>

      <img
        src="${pokemon.sprites.front_default}"
        alt="${capitalizeText(pokemon.name)}"
      />

      <h2 class="pokemon-name">${capitalizeText(pokemon.name)}</h2>

      <div class="pokemon-types">
        ${types}
      </div>
    </article>
  `;
}
