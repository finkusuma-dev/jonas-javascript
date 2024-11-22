class SearchView {
  #formElement: HTMLFormElement = document.querySelector('.search')!;

  getQuery() {
    return (
      this.#formElement.querySelector('.search__field')! as HTMLInputElement
    ).value;
  }

  addHandlerSearch(handler: () => void) {
    this.#formElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
