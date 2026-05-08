const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const API_TYPE_URL = "https://pokeapi.co/api/v2/type";

export async function getPokemonList(limit, offset) {
  const response = await fetch(
    `${API_BASE_URL}?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await response.json();

  return data.results;
}

export async function getPokemonDetails(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }

  return response.json();
}

export async function getPokemonByType(type) {
  const response = await fetch(`${API_TYPE_URL}/${type}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon by type: ${type}`);
  }

  const data = await response.json();

  return data.pokemon.map((pokemonData) => {
    return pokemonData.pokemon;
  });
}
