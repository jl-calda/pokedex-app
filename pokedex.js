async function pokedex() {
  let model = new PokedexModel();
  await model._initPokemons();
  const header = new HeaderView()._render();
  console.log(header);
  const controller = new PokeController(model, new PokedexView(header));
  return controller;
}

pokedex();
