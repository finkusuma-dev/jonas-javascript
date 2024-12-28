import icons from 'url:../../img/icons.svg';
import * as model from '../model';

class RecipePreview {
  static render(preview: model.Recipe) {
    const hashId = document.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          hashId === preview.id ? 'preview__link--active' : ''
        }" href="#${preview.id}">
          <figure class="preview__fig">
            <img src="${preview.image}" alt="${preview.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${preview.title}</h4>
            <p class="preview__publisher">${preview.publisher}</p>
            <div class="preview__user-generated ${
              preview.key ? '' : 'hidden'
            }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
          </div>
        </a>
      </li>`;
  }
}

export default RecipePreview;
