class PokedexModel {
  #url;
  constructor() {
    this.#url = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
    this.pokemons = [];
    this.types = [];
    this.initialListCount = 15;
    this.pokemonList = [];
    this.showPokemon = {}; //
    this.showPokemonList = [];
    this.initColors = [];
    this.colors = [
      '#A6B91A',
      '#705746',
      '#6F35FC',
      '#F7D02C',
      '#D685AD',
      '#C22E28',
      '#EE8130',
      '#A98FF3',
      '#735797',
      '#7AC74C',
      '#E2BF65',
      '#96D9D6',
      '#A8A77A',
      '#A33EA1',
      '#F95587',
      '#B6A136',
      '#B7B7CE',
      '#6390F0',
    ];
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
          img: data.sprites.other['official-artwork'].front_default,
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

    const types = pokemons.map((pokemon) => pokemon.type);
    this._initPokelist(pokemons, types);
  }

  bindDisplayPokemon(callback) {
    this.displayPokemon = callback;
  }

  bindDisplayListView(callback) {
    this.displayListView = callback;
  }

  _initPokelist(pokemons, types) {
    this.pokemons.push(...pokemons); //all pokemon list
    this.types.push(...new Set(types.flat()));
    this.types.sort();
    this.pokemonList = this.pokemons.slice();
    while (this.pokemonList.length > this.initialListCount) {
      const length = this.pokemonList.length;
      this.pokemonList.splice(
        Math.floor(Math.random() * (length - 0 + 1) + 0),
        1
      );
    }
    this.showPokemon = this.pokemonList[0];
    const colors = this.showPokemon.type.map(
      (type) => this.colors[this.types.indexOf(type)]
    );
    this.initColors = colors;
  }

  filterListPokemon(type) {
    const filteredPokemons = this.pokemons.filter((pokemon) =>
      pokemon.type.includes(type)
    );
    this.pokemonList = filteredPokemons;
    this.showPokemon = this.pokemonList[0];
    const colors = this.showPokemon.type.map(
      (type) => this.colors[this.types.indexOf(type)]
    );
    this.displayPokemon(this.showPokemon, colors);
    this.displayListView(this.pokemonList);
  }

  changeShowPokemon(id) {
    // console.log(this.pokemons);
    this.showPokemon = this.pokemonList[Number(id)];
    console.log(this.showPokemon);
    const colors = this.showPokemon.type.map(
      (type) => this.colors[this.types.indexOf(type)]
    );

    this.displayPokemon(this.showPokemon, colors);
    // console.log('pokemon changed');
  }

  changeListPokemon(text) {
    const filteredPokemons = this.pokemons.filter((pokemon) => {
      return pokemon.name.match(text);
    });
    this.pokemonList = filteredPokemons;
    this.showPokemon = this.pokemonList[0];
    const colors = this.showPokemon.type.map(
      (type) => this.colors[this.types.indexOf(type)]
    );
    this.displayPokemon(this.showPokemon, colors);
    this.displayListView(this.pokemonList);
  }
}
// Bug Type: #A6B91A
// Dark Type: #705746
// Dragon Type: #6F35FC
// Electric Type: #F7D02C
// Fairy Type: #D685AD
// Fighting Type: #C22E28
// Fire Type: #EE8130
// Flying Type: #A98FF3
// Ghost Type: #735797
// Grass Type: #7AC74C
// Ground Type: #E2BF65
// Ice Type: #96D9D6
// Normal Type: #A8A77A
// Poison Type: #A33EA1
// Psychic Type: #F95587
// Rock Type: #B6A136
// Steel Type: #B7B7CE
// Water Type: #6390F0
