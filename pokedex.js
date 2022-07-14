async function pokedex() {
  let model = new PokedexModel();
  await model._initPokemons();
  const header = new HeaderView();
  const list = new ListView();
  const pokemon = new PokemonView();
  const controller = new PokeController(model, header, list, pokemon);
  return controller;
}

// const listView = new ListView();
pokedex();
// const pokedex = new PokeController(
//   new PokedexModel(),
//   new HeaderView(),
//   new ListView(),
//   new PokemonView()
// );
