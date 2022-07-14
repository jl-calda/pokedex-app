class View {
  constructor() {}
  _createElement(tag, arrClass = null) {
    const el = document.createElement(tag);
    if (arrClass) {
      el.classList.add(...arrClass);
    }
    return el;
  }
}

class HeaderView extends View {
  constructor() {
    super();
    //header
    this.header_container = document.getElementById("header");
    this.form_search = this._createElement("form");
    this.title = this._createElement("h1");
    this.title.textContent = "Pokedex";
    this.search = this._createElement("input");
    this.search.type = "text";
    this.search.placeholder = "search pokemon...";
    this.form_search.append(this.search);
    this.header_container.append(this.title, this.form_search);
    //
  }

  handleSearch(handler) {
    this.form_search.addEventListener("change", (e) => {
      e.preventDefault();
      console.log("handleSearch");
    });
  }
}

class ListView extends View {
  constructor() {
    super();
    this.list_container = document.getElementById("list-container");
    this.filter_bar = this._createElement("div");
    this.filter_bar.textContent = "FILTER BAR";
    this.list = this._createElement("ul");
    this.list_container.append(this.filter_bar, this.list);
  }

  renderList(pokemons) {
    console.log(pokemons);
    const items = pokemons.map((pokemon) => {
      const li = this._createElement("li");
      const h3 = this._createElement("h4");
      h3.textContent = pokemon.name;
      const types = pokemon.type.map((type) => {
        const span = this._createElement("span");
        span.textContent = type;
        return span;
      });
      li.append(h3, ...types);
      return li;
    });
    this.list.append(...items);

    return this;
  }
}

class PokemonView extends View {
  constructor(header) {
    super();
    this.pokemon_container = this._createElement("div");
  }

  displayPokemon(pokemon) {
    const img = this._createElement("img");
    img.src = pokemon.img;
    const title = this._createElement("h3");
    title.textContent = pokemon.name;
    const weight = this._createElement("p");
    weight.textContent = `Weight : ${pokemon.weight}`;
    const height = this._createElement("p");
    height.textContent = `Height : ${pokemon.height}`;
    this.pokemon_container.append(img, title, weight, height);
  }
}
