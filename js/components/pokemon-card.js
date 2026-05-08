import { formatPokemonId, capitalizeText } from "../utils/format.js";

export function createPokemonCard(pokemon) {
  const types = pokemon.types
    .map((typeInfo) => {
      return `
        <span class="badge rounded-pill bg-secondary">
          ${capitalizeText(typeInfo.type.name)}
        </span>
      `;
    })
    .join("");

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return `
    <article class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card pokemon-card h-100 border-0 shadow-sm">
        <div class="card-body text-center">
          <p class="text-muted small mb-2">${formatPokemonId(pokemon.id)}</p>

          <img
            src="${image}"
            alt="${capitalizeText(pokemon.name)}"
            class="img-fluid pokemon-card-img mb-3"
          />

          <h3 class="h5 fw-bold">
            ${capitalizeText(pokemon.name)}
          </h3>

          <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
            ${types}
          </div>
        </div>
      </div>
    </article>
  `;
}
