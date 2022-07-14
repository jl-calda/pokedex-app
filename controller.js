class PokeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.displayPokemon(this.model.pokemons[2]);

    // displayChange = () =>{

    // }
  }
  displayPokemon = (poke) => {
    this.view.displayPokemon(poke);
  };
}
