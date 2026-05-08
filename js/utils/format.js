export function formatPokemonId(id) {
  return `#${String(id).padStart(3, "0")}`;
}

export function capitalizeText(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
