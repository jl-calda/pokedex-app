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
    this.header_container = document.getElementById('header');
    this.form_search = this._createElement('form');
    this.title = this._createElement('h1');
    this.title.textContent = 'Pokedex';
    this.search = this._createElement('input');
    this.search.type = 'text';
    this.search.placeholder = 'search pokemon...';
    this.hiddenbutton = this._createElement('button');
    this.hiddenbutton.type = 'submit';
    this.form_search.append(this.search, this.hiddenbutton);
    this.hiddenbutton.style.display = 'none';
    this.header_container.append(this.title, this.form_search);
    //
  }

  bindSearchPokemon(handler) {
    this.form_search.addEventListener('input', (e) => {
      e.preventDefault();
      const text = this.search.value;
      handler(text);
    });
    this.form_search.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.search.value;
      handler(text);
      console.log('submit');
      this.form_search.reset();
      document.getElementById('filter-bar').firstChild.selected = true;
    });
  }
}

class ListView extends View {
  constructor() {
    super();
    this.list_container = document.getElementById('list-container');
    this.filter_bar = this._createElement('select');
    this.filter_bar.id = 'filter-bar';
    this.option = this._createElement('option');
    this.option.text = 'filter by type...';
    this.option.selected = true;
    this.filter_bar.append(this.option);
    this.list = this._createElement('ul');
    this.list_container.append(this.filter_bar, this.list);
  }

  renderFilter(types) {
    const options = types.map((type) => {
      const option = this._createElement('option');
      option.text = type;
      return option;
    });
    this.filter_bar.append(...options);
  }

  bindFilterList(handler) {
    this.filter_bar.addEventListener('change', (e) => {
      if (this.filter_bar.value !== 'filter by type...') {
        const type = this.filter_bar.value;
        handler(type);
      }
    });
  }

  renderList(pokemons, text = null) {
    this.list.textContent = '';
    const items = pokemons.map((pokemon, i) => {
      const li = this._createElement('li');
      li.setAttribute('data-id', String(i));
      const link = this._createElement('a');
      const h3 = this._createElement('h4');
      h3.textContent = pokemon.name;
      const types = pokemon.type.map((type) => {
        const span = this._createElement('span');
        span.textContent = type;
        return span;
      });
      const div = this._createElement('div');
      div.append(h3, ...types);
      link.append(div);
      li.append(link);
      return li;
    });

    this.list.append(...items);
    return this;
  }

  bindShowPokemon(handler) {
    this.list.addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target.element = 'li')) {
        const id = e.target.closest('li').dataset.id;
        handler(id);
      }
    });
  }
}

class PokemonView extends View {
  constructor(header) {
    super();
    this.pokemon_container = document.getElementById('pokemon-container');
  }

  renderPokemon(pokemon, colors) {
    this.pokemon_container.textContent = '';
    const img = this._createElement('img');
    img.src = pokemon.img;
    img.alt = `image of pokemon named $pokemon.name`;
    const title = this._createElement('h3');
    title.textContent = pokemon.name;
    const weight = this._createElement('p');
    weight.textContent = `Weight : ${pokemon.weight}`;
    const height = this._createElement('p');
    height.textContent = `Height : ${pokemon.height}`;
    const types = pokemon.type.map((type, i) => {
      const span = this._createElement('span');
      span.style.display = 'inline-block';
      console.log(colors[i]);
      span.style.backgroundColor = colors[i];
      span.textContent = type;
      return span;
    });
    this.pokemon_container.append(img, title, weight, height, ...types);
  }
}
