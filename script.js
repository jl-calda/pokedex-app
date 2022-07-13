class PokedexModel {
  #url;
  constructor() {
    this.#url = 'https://pokeapi.co/api/v2/pokemon?limit=1154';
    this.pokemons = [];
    this.types = [];
    this._getPokemons(this.#url);
  }

  async _getPokemons(url) {
    const response = await fetch(url);
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

    const types = pokemons.map((pokemon) => {
      return pokemon.type;
    });
    this.pokemons.push(...pokemons);
    this.types.push(new Set(types.flat()));
  }
}

const pokedex = new PokedexModel();

class PokedexView {
  constructor() {
    this.root = document.getElementById('root');
    this.pokedex = this._createElement('div');
    //header
    this.header_container = this._createElement('div');
    this.form_search = this._createElement('form');
    this.title = this._createElement('h1');
    this.title.textContent = 'Pokedex';
    this.search = this._createElement('input');
    this.search.type = 'text';
    this.search.placeholder = 'search pokemon...';
    this.form_search.append(this.search);
    this.header_container.append(this.title, this.form_search);
    //
    this.list_container = this._createElement('div');
    this.list = this._createElement('ul');
    this.pokemon = this._createElement('div');
    this.root.append(this.header_container);
  }

  _createElement(tag, arrClass = null) {
    const el = document.createElement(tag);
    if (arrClass) {
      el.classList.add(...arrClass);
    }
    return el;
  }
}

const pokeView = new PokedexView();
