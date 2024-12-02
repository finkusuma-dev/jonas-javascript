import icons from 'url:../../img/icons.svg';

export default class View<T> {
  protected _parentElement: HTMLElement = {} as HTMLElement;
  protected _data?: T = {} as T;
  protected _errorMessage: string = 'Error';
  protected _defaultMessage: string = 'This is default message';

  render(data?: T) {
    this._data = data;

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

  /**
   * @description Generate the new markup, convert it to html elements. Copy the elements that are different to the current elements.
   */
  update(data?: T) {
    if (!data) return;

    this._data = data;

    const newMarkup = this._generateMarkup();

    /// Create DOM using newMarkup
    const newDOM = document
      .createRange()
      .createContextualFragment(newMarkup);

    /// List the new elements from the newDOM
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log({ newElements });

    /// List current elements
    const curElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );
    // console.log({ curElements });

    /// Compare the new elements with current elements
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      /// Process if the elements are different
      if (!newEl.isEqualNode(curEl)) {
        /// === Copy text ===
        /// Set elements' textContent for elements that only text node.
        /// How we check if it's text node if the nodeValue returns non empty value.
        if ((newEl as Element).firstChild?.nodeValue?.trim() !== '') {
          curEl.textContent = newEl.textContent;
        }
        /// === Copy data attributes ===
        /// Set attributes of current elements to new elements
        Array.from((newEl as Element).attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  protected _generateMarkup(): string {
    console.log('View _generateMarkup');
    return 'abc';
  }

  clear() {
    this._parentElement.innerHTML = '';
  }
}
