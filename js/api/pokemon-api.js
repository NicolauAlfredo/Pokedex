const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

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
