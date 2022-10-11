export default class Popup {
  constructor (selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // via close-icon
    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', this.close.bind(this));

    // via overlay
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}
