class PokeController {
  constructor(model, viewHeader, viewList, viewPokemon) {
    this.model = model;
    this.root = document.getElementById("root");
    this.viewHeader = viewHeader;
    // this.viewList = viewList;
    this.viewPokemon = viewPokemon;
    this.displayListView(this.model.pokemons);
    // this.root.append(this.viewHeader, this.viewList, this.viewPokemon);
  }

  displayListView = (pokemons) => {
    this.viewList.renderList(pokemons);
  };

  // displayHeader = () => {
  //   console.log(this);
  //   this.viewHeader.renderHeader();
  // };
}
