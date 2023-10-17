class Preview extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
        <img class="preview__image" src="${image}"/>
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;
    }
}