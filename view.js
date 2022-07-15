class View {
  constructor() {}
  _createElement(tag, arrObj = null, arrAttri = null, text = null) {
    const el = document.createElement(tag.selector);
    if (arrObj.classes) {
      const classes = arrObj.classes;
      el.classList.add(...classes);
    }
    if (arrAttri.attributes) {
      arrAttri.attributes.forEach((attri) => {
        const attribute = attri.attribute;
        const value = attri.value;
        el.setAttribute(attribute, value);
      });
    }
    if (text.innerText) {
      el.innerText = text.innerText;
    }
    return el;
  }

  _getElementById(id, arrObj = null, arrAttri = null, text = null) {
    const el = document.getElementById(id.selector);
    if (arrObj.classes) {
      const classes = arrObj.classes;
      el.classList.add(...classes);
    }
    if (arrAttri.attributes) {
      arrAttri.attributes.forEach((attri) => {
        const attribute = attri.attribute;
        const value = attri.value;
        el.setAttribute(attribute, value);
      });
    }
    if (text.innerText) {
      el.innerText = text.innerText;
    }
    return el;
  }
}
