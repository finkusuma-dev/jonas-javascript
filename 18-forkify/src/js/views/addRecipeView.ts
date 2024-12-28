import icons from 'url:../../img/icons.svg';

class addRecipeView {
  #parentElement = document.querySelector<HTMLElement>(
    '.add-recipe-window'
  )!;
  #overlay = document.querySelector<HTMLElement>('.overlay')!;
  #closeBtn = document.querySelector<HTMLElement>(
    '.btn--close-modal'
  )!;
  #openBtn = document.querySelector<HTMLElement>(
    '.nav__btn--add-recipe'
  )!;

  #buttonIcon = this.#parentElement.querySelector<HTMLElement>('use');

  #errorContainer =
    this.#parentElement.querySelector<HTMLElement>('.error')!;

  constructor() {
    this.#closeBtn.addEventListener('click', () => {
      this.hide();
    });
    this.#openBtn.addEventListener('click', () => {
      this.show();
    });
  }

  show() {
    this.#parentElement.classList.remove('hidden');
    this.#overlay.classList.remove('hidden');
  }
  hide() {
    this.#parentElement.classList.add('hidden');
    this.#overlay.classList.add('hidden');
  }

  addHandlerSubmit(handler: (e: SubmitEvent) => void) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler(e);
    });
  }

  renderBusy(isBusy: boolean = true) {
    const uploadBtn =
      this.#parentElement.querySelector<HTMLElement>('.upload__btn')!;
    if (isBusy) {
      uploadBtn.innerHTML = `
        <spinner>
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </spinner>
        <span>Upload</span>
        `;
    } else {
      uploadBtn.innerHTML = `
        <svg>
          <use href="${icons}#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>`;
    }
  }

  renderError(message: string) {
    const markup = `
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          `;
    this.#errorContainer.innerHTML = markup;
  }

  clearError() {
    this.#errorContainer.innerHTML = '';
  }
}

export default new addRecipeView();
