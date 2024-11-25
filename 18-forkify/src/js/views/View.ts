import icons from 'url:../../img/icons.svg';

export default class View<T> {
  protected _parentElement: HTMLElement = {} as HTMLElement;
  protected _data: T = {} as T;
  protected _errorMessage: string = 'Error';
  protected _defaultMessage: string = 'This is default message';

  render(data?: T) {
    this._data = data ?? ({} as T);
    if (!data || (Array.isArray(data) && !data.length)) {
      return this.renderError();
    }
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = markup;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this._parentElement.innerHTML = markup;
  }

  renderError(message: string = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._parentElement.innerHTML = markup;
  }

  renderMessage(message: string = this._defaultMessage) {
    const markup = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._parentElement.innerHTML = markup;
  }

  protected _generateMarkup(): string {
    console.log('View _generateMarkup');
    return 'abc';
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}
