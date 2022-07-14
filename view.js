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
    this.header_container = this._createElement("div");
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
  _render() {
    return this.header_container;
  }
}

class PokedexView extends View {
  constructor(header) {
    super();
    this.root = document.getElementById("root");
    this.pokedex = this._createElement("div");
    this.header = header;

    this.list_container = this._createElement("div");
    this.list = this._createElement("ul");
    this.pokemon = this._createElement("div");
    this.root.append(this.header, this.pokemon);
  }

  displayPokemon(poke) {
    const img = this._createElement("img");
    console.log(poke);
    img.srcset = poke.img;
    this.pokemon.append(img);
  }
}

class ListView {
  constructor() {
    this.list;
  }
}
