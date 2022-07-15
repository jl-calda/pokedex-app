class HeaderView extends View {
  constructor() {
    super();
    //header
    this.header_container = this._getElementById(
      { selector: "header-container" },
      {
        classes: [
          "flex",
          "justify-between",
          "content-center",
          "bg-amber-50",
          "p-2",
          "border-b",
          "border-amber-500",
        ],
      },
      { attributes: null },
      { innerText: null }
    );
    this.form_search = this._createElement(
      { selector: "form" },
      { classes: null },
      { attributes: null },
      { innerText: null }
    );
    this.title = this._createElement(
      { selector: "h1" },
      { classes: ["ml-8", "text-3xl", "font-bold"] },
      { attributes: null },
      { innerText: "Pokedex" }
    );
    this.search = this._createElement(
      { selector: "input" },
      { classes: ["bg-rose-50", "px-4", "py-2", "rounded-lg", "flex-1"] },
      {
        attributes: [
          { attribute: "type", value: "text" },
          { attribute: "placeholder", value: "search for your pokemon..." },
        ],
      },
      { innerText: "Pokedex" }
    );
    this.hiddenbutton = this._createElement(
      { selector: "button" },
      { classes: null },
      {
        attributes: [
          { attribute: "type", value: "submit" },
          { attribute: "style", value: "display:none" },
        ],
      },
      { innerText: null }
    );
    this.form_search.append(this.search, this.hiddenbutton);
    // this.hiddenbutton.style.display = "none";
    this.header_container.append(this.title, this.form_search);
    //
  }

  bindSearchPokemon(handler) {
    this.form_search.addEventListener("input", (e) => {
      e.preventDefault();
      const text = this.search.value;
      handler(text);
    });
    this.form_search.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = this.search.value;
      handler(text);
      this.form_search.reset();
      document.getElementById("filter-bar").firstChild.selected = true;
    });
  }
}
