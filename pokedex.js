let model = new PokedexModel();
async function pokedex() {
  await model._initPokemons();
  const header = new HeaderView();
  const listView = new ListView();
  const pokemon = new PokemonView();
  const controller = new PokeController(model, header, listView, pokemon);
  return controller;
}

const listView = new ListView();
pokedex();
// const pokedex = new PokeController(
//   new PokedexModel(),
//   new HeaderView(),
//   new ListView(),
//   new PokemonView()
// );
