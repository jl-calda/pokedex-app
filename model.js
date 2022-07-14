class PokedexModel {
  #url;
  constructor() {
    this.#url = "https://pokeapi.co/api/v2/pokemon?limit=1154";
    this.pokemons = [];
    this.types = [];
  }

  async _initPokemons() {
    const response = await fetch(this.#url);
    const pokemonData = await response.json();

    let pokemons = await Promise.all(
      pokemonData.results.map(async (pokemonObj) => {
        const url = pokemonObj.url;
        const response = await fetch(url);
        const data = await response.json();
        const pokemon = {
          name: data.name,
          height: data.height,
          img: data.sprites.other["official-artwork"].front_default,
          type: data.types.map((type) => type.type.name),
          weight: data.weight,
        };
        return pokemon;
      })
    );

    pokemons = pokemons.filter(
      (pokemon) =>
        pokemon.name !== null &&
        pokemon.height !== null &&
        pokemon.img !== null &&
        pokemon.type !== null &&
        pokemon.weight !== null
    );

    const types = pokemons.map((pokemon) => {
      return pokemon.type;
    });
    this.pokemons.push(...pokemons);
    this.types.push(new Set(types.flat()));
  }
}
