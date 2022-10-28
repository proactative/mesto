import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {

  constructor(selector) {
    super(selector);
    this._form =this._popup.querySelector('.popup__form_confirm-delition');
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
    this._form.addEventListener('submit', () => {
      this._deleteCardFromBrowserCallback();
      this._deleteCardFromServerCallback();
      this.close();
    });
  }
}
