class ListView extends View {
  constructor() {
    super();
    this.list_container = this._getElementById(
      { selector: "list-container" },
      {
        classes: [
          "w-3/5",
          "h-100%",
          "flex",
          "flex-col",
          "container",
          "relative",
        ],
      },
      { attributes: null },
      { innerText: null }
    );
    this.filter_container = this._createElement(
      { selector: "div" },
      {
        classes: ["flex", "flex-1", "grow", "border-b", "p-4", "fixed"],
      },
      { attributes: null },
      { innerText: null }
    );
    this.filter_reset = this._createElement(
      { selector: "button" },
      {
        classes: [
          "block",
          "grow",
          "px-2",
          "py-1",
          "rounded-2xl",
          "bg-rose-50",
          "border-2",
          "border-rose-200",
        ],
      },
      { attributes: null },
      { innerText: "reset" }
    );
    this.filter_bar = this._createElement(
      { selector: "select" },
      { classes: ["inline-block", "max-w-full"] },
      { attributes: [{ attribute: "id", value: "filter-bar" }] },
      { innerText: "reset" }
    );
    this.option = this._createElement(
      { selector: "option" },
      { classes: null },
      { attributes: [{ attribute: "selected", value: true }] },
      { innerText: "filter by type..." }
    );
    this.filter_bar.append(this.option);
    this.filter_container.append(this.filter_bar, this.filter_reset);
    this.list = this._createElement(
      { selector: "ul" },
      { classes: ["mt-16", "h-screen", "overflow-y-scroll"] },
      { attributes: null },
      { innerText: null }
    );
    this.list_container.append(this.filter_container, this.list);
  }

  renderFilter(types) {
    const options = types.map((type) => {
      const option = this._createElement(
        { selector: "option" },
        { classes: null },
        { attributes: null },
        { innerText: type }
      );
      return option;
    });
    this.filter_bar.append(...options);
  }

  bindFilterList(handler) {
    this.filter_bar.addEventListener("change", (e) => {
      if (this.filter_bar.value !== "filter by type...") {
        const type = this.filter_bar.value;
        handler(type);
      }
    });
  }

  bindResetList(handler) {
    this.filter_reset.addEventListener("click", (e) => {
      this.filter_bar.firstChild.selected = true;
      handler();
    });
  }

  renderList(pokemons, colors, typesList) {
    this.list.textContent = "";
    const items = pokemons.map((pokemon, i) => {
      const li = this._createElement(
        { selector: "li" },
        { classes: null },
        { attributes: [{ attribute: "data-id", value: String(i) }] },
        { innerText: null }
      );
      const link = this._createElement(
        { selector: "a" },
        { classes: ["block", "py-2", "border-b"] },
        { attributes: null },
        { innerText: null }
      );
      const logo = this._createElement(
        { selector: "img" },
        { classes: ["inline-block"] },
        {
          attributes: [
            { attribute: "src", value: pokemon.logo },
            { attribute: "width", value: "48px" },
            {
              attribute: "alt",
              value: `sprite of pokemon named ${pokemon.name}`,
            },
          ],
        },
        { innerText: null }
      );
      const h3 = this._createElement(
        { selector: "h4" },
        {
          classes: [
            "uppercase",
            "font-bold",
            "text-gray-700",
            "px-4",
            "border-x-2",
          ],
        },
        { attributes: null },
        { innerText: pokemon.name }
      );
      const types = pokemon.type.map((type) => {
        const color = colors[typesList.indexOf(type)];
        const span = this._createElement(
          { selector: "span" },
          {
            classes: [
              "inline-block",
              "px-3",
              "py-2",
              "rounded-2xl",
              "text-xs",
              "font-bold",
              "text-zinc-800",
            ],
          },
          {
            attributes: [
              { attribute: "style", value: `background-color:${color}` },
            ],
          },
          { innerText: type }
        );
        return span;
      });
      const div = this._createElement(
        { selector: "div" },
        { classes: ["pl-2", "flex", "gap-2", "items-center"] },
        { attributes: null },
        { innerText: null }
      );
      div.append(logo, h3, ...types);
      link.append(div);
      li.append(link);
      return li;
    });

    this.list.append(...items);
    return this;
  }

  bindShowPokemon(handler) {
    this.list.addEventListener("click", (e) => {
      e.preventDefault();
      if ((e.target.element = "li")) {
        const id = e.target.closest("li").dataset.id;
        handler(id);
      }
    });
  }
}
