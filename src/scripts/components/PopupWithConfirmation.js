import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  constructor(selector) {
    super(selector);
    this._confirmationButton = this._popup.querySelector(".popup__button");
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }

  setDeleteCardFromBrowserCallback(callback) {
    this._deleteCardFromBrowserCallback = callback;
  }

  setDeleteCardFromServerCallback(callback) {
    this._deleteCardFromServerCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', () => {
      this._deleteCardFromBrowserCallback();
      this._deleteCardFromServerCallback();
      this.close();
    });
  }
}
