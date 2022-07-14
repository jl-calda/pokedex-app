class PokeController {
  constructor(model, viewHeader, viewList, viewPokemon) {
    this.model = model;
    this.root = document.getElementById('root');
    this.viewHeader = viewHeader;
    this.viewList = viewList;
    this.viewPokemon = viewPokemon;
    this.viewList.bindShowPokemon(this.handleShowPokemon);
    this.viewHeader.bindSearchPokemon(this.handleSearchPokemon);
    this.viewList.bindFilterList(this.handleFilterList);
    this.model.bindDisplayPokemon(this.displayPokemon);
    this.model.bindDisplayListView(this.displayListView);
    this.displayFilter(this.model.types);
    this.displayListView(this.model.pokemonList);
    this.displayPokemon(this.model.showPokemon, this.model.initColors);

    // this.root.append(this.viewHeader, this.viewList, this.viewPokemon);
  }

  displayFilter = (types) => {
    this.viewList.renderFilter(types);
  };
  displayListView = (pokemons) => {
    this.viewList.renderList(pokemons);
  };

  displayPokemon = (showPokemon, colors) => {
    this.viewPokemon.renderPokemon(showPokemon, colors);
  };

  handleShowPokemon = (id) => {
    this.model.changeShowPokemon(id);
  };

  handleSearchPokemon = (text) => {
    this.model.changeListPokemon(text);
  };

  handleFilterList = (text) => {
    this.model.filterListPokemon(text);
  };
  // displayHeader = () => {
  //   console.log(this);
  //   this.viewHeader.renderHeader();
  // };
}
