class PokemonView extends View {
  constructor(header) {
    super();
    this.pokemon_container = this._getElementById(
      { selector: "pokemon-container" },
      {
        classes: [
          "container",
          "mx-auto",
          "w-full",
          "text-center",
          "flex",
          "flex-col",
          "place-items-center",
          "justify-center",
          "gap-2",
          "mb-16",
        ],
      },
      { attributes: null },
      { innerText: null }
    );
  }

  renderPokemon(pokemon, colors) {
    this.pokemon_container.textContent = "";

    const img = this._createElement(
      { selector: "img" },
      { classes: ["block", "mx-auto"] },
      {
        attributes: [
          { attribute: "src", value: pokemon.img },
          { attribute: "alt", value: `image of pokemon named ${pokemon.name}` },
        ],
      },
      { innerText: null }
    );
    const title = this._createElement(
      { selector: "h3" },
      { classes: ["text-4xl", "font-bold", "uppercase"] },
      { attributes: null },
      { innerText: pokemon.name }
    );
    const weight = this._createElement(
      { selector: "p" },
      { classes: null },
      { attributes: null },
      { innerText: `Weight : ${pokemon.weight}` }
    );
    const height = this._createElement(
      { selector: "p" },
      { classes: null },
      { attributes: null },
      { innerText: `Height : ${pokemon.height}` }
    );
    const types = pokemon.type.map((type, i) => {
      const span = this._createElement(
        { selector: "span" },
        {
          classes: [
            "px-4",
            "py-2",
            "rounded-full",
            "text-gray-700",
            "inline-block",
            "flex-none",
            "mr-4",
          ],
        },
        {
          attributes: [
            { attribute: "style", value: `background-color:${colors[i]}` },
          ],
        },
        { innerText: type }
      );
      return span;
    });

    const span_container = this._createElement(
      { selector: "div" },
      { classes: ["flex"] },
      { attributes: null },
      { innerText: null }
    );
    span_container.append(...types);
    this.pokemon_container.append(img, title, weight, height, span_container);
  }
}
