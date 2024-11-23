import icons from 'url:../../img/icons.svg';

export default class View<T> {
  protected _parentElement: HTMLElement = {} as HTMLElement;
  protected _data: T = {} as T;

  renderSpinner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this._parentElement.innerHTML = markup;
  }

  render(data: T) {
    this._data = data;
    const markup = this._generateMarkup();
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
