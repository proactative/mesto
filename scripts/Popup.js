import { popupCloseButton } from "./index.js";

export default class Popup {
  constructor (popupSelector) {
    this._popup = popupSelector;
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
      close();
    }
  }

  setEventListeners() {
    //крестик
    popupCloseButton.addEventListener('click', () => close());
    // кликна темную область вокруг формы
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')) {
        closePopup();
      }
    });
  }
}
